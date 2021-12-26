import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/group';
import { Invitation } from 'src/invitations/invitation';
import { ListSort } from 'src/list-sorts/list-sort';
import { List } from 'src/lists/list';
import { Monster } from 'src/monsters/monster';
import { User } from 'src/users/user';
import { getConnection, Repository } from 'typeorm';
import { NewProjectInput, SelectUser } from './dto/newProject.input';
import { Project } from './project';
import { v4 as uuidv4 } from 'uuid';
import { GameLog } from 'src/game-logs/game-log';
import { EndProjectInput } from './dto/endProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';
import { Task } from 'src/tasks/task';
import { Allocation } from 'src/allocations/allocation';
import { Chat } from 'src/chats/chat';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Monster)
    private monsterRepository: Repository<Monster>,
    @InjectRepository(List)
    private listRepository: Repository<List>,
    @InjectRepository(ListSort)
    private listSortRepository: Repository<ListSort>,
    @InjectRepository(GameLog)
    private gameLogRepository: Repository<GameLog>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Allocation)
    private allocationRepository: Repository<Allocation>,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async create({
    newProject,
    selectUser,
  }: {
    newProject: NewProjectInput;
    selectUser: SelectUser;
  }): Promise<{
    project: Project;
    invitations: {
      invitations: Invitation[];
      userId: string;
    }[];
    currentUser: User;
  }> {
    const invitations: {
      invitations: Invitation[];
      userId: string;
    }[] = [];

    // モンスターの取得
    const monster = await this.monsterRepository.findOne(1);

    // プロジェクトの作成
    const project = this.projectRepository.create({
      ...newProject,
      id: uuidv4().slice(0, 8),
      end_date: new Date(newProject.end_date),
      monster,
    });
    await this.projectRepository.save(project).catch((err) => {
      new InternalServerErrorException();
    });

    // 招待アカウントを作成
    for (
      let userIdsIndex = 1;
      userIdsIndex < selectUser.ids.length;
      userIdsIndex++
    ) {
      const user = await this.userRepository.findOne({
        id: selectUser.ids[userIdsIndex],
      });
      const newInvitationData = this.invitationRepository.create({
        project,
        user,
      });

      await this.invitationRepository.save(newInvitationData).catch((err) => {
        new InternalServerErrorException();
      });

      const invitationsData = await this.invitationRepository.find({
        where: {
          user: {
            id: selectUser.ids[userIdsIndex],
          },
        },
        relations: ['user', 'project'],
      });

      invitations.push({
        invitations: invitationsData,
        userId: selectUser.ids[userIdsIndex],
      });
    }

    // グループテーブルを作成
    const currentUser = await this.userRepository.findOne({
      id: selectUser.ids[0],
    });
    const group = this.groupRepository.create({
      user: currentUser,
      project,
      authority_flg: true,
    });
    await this.groupRepository.save(group).catch((err) => {
      new InternalServerErrorException();
    });

    // ログの作成
    const log = this.gameLogRepository.create({
      context: 'モンスターの卵',
      user: currentUser,
      project,
    });
    await this.gameLogRepository.save(log).catch((err) => {
      new InternalServerErrorException();
    });

    // リストの作成
    for (let index = 0; index <= 3; index++) {
      const listName = ['未着手', '進行中', '完了'];

      const list = this.listRepository.create({
        name: listName[index],
        list_id: uuidv4().slice(0, 8),
        project,
      });
      await this.listRepository.save(list).catch((err) => {
        new InternalServerErrorException();
      });
      const listSort = this.listSortRepository.create({
        task_list: index,
        list,
      });
      await this.listSortRepository.save(listSort).catch((err) => {
        new InternalServerErrorException();
      });
    }

    const user = await this.userRepository.findOne(selectUser.ids[0], {
      relations: [
        'interests',
        'certifications',
        'invitations',
        'invitations.project',
        'groups',
        'groups.project',
        'groups.project.groups',
        'groups.project.groups.user',
        'groups.project.groups.user.occupation',
        'groups.project.monster',
        'groups.project.monster.specie',
        'occupation',
      ],
    });

    return {
      project,
      invitations,
      currentUser: user,
    };
  }

  findProjectOne(id: string): Promise<Project> {
    const project = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.monster', 'monster')
      .leftJoinAndSelect('monster.specie', 'specie')
      .leftJoinAndSelect('project.invitations', 'invitations')
      .leftJoinAndSelect('project.lists', 'lists')
      .leftJoinAndSelect('lists.listSorts', 'listSorts')
      .leftJoinAndSelect('lists.tasks', 'tasks')
      .leftJoinAndSelect('tasks.allocations', 'allocations')
      .leftJoinAndSelect('tasks.chats', 'chats')
      .leftJoinAndSelect('allocations.user', 'allocationsUser')
      .leftJoinAndSelect(
        'allocationsUser.occupation',
        'allocationUserOccupation',
      )
      .leftJoinAndSelect('project.groups', 'groups')
      .leftJoinAndSelect('groups.user', 'groupsUser')
      .leftJoinAndSelect('groupsUser.occupation', 'occupation')
      .leftJoinAndSelect('groupsUser.interests', 'interests')
      .leftJoinAndSelect('groupsUser.certifications', 'certifications')
      .where('project.id=:id', { id })
      .loadRelationCountAndMap('tasks.chatCount', 'tasks.chats')
      .getOne();

    if (!project) throw new NotFoundException();

    return project;
  }

  async completedProject(endProject: EndProjectInput): Promise<boolean> {
    try {
      const project = await this.projectRepository.findOne(
        endProject.project_id,
      );
      if (!project) throw new NotFoundException();

      project.project_end_flg = true;
      await this.projectRepository.save(project).catch((err) => {
        new InternalServerErrorException();
      });

      const user = await this.userRepository.findOne(endProject.user_id);
      if (!user) throw new NotFoundException();

      const log = this.gameLogRepository.create({
        context: 'プロジェクト',
        user,
        project,
      });
      this.gameLogRepository.save(log).catch((err) => {
        new InternalServerErrorException();
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async updateProject(
    id: string,
    updateProject: UpdateProjectInput,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne(id, {
      relations: [
        'monster',
        'monster.specie',
        'groups',
        'groups.user',
        'groups.user.occupation',
      ],
    });

    project.name = updateProject.name;
    project.overview = updateProject.overview;
    project.difficulty = updateProject.difficulty;
    project.end_date = new Date(updateProject.end_date);

    this.projectRepository.save(project).catch((err) => {
      new InternalServerErrorException();
    });

    return project;
  }

  async deleteProject(projectId: string, userId: string) {
    const project = await this.projectRepository.findOne(projectId);

    //プロジェクトに紐づいてるもの削除
    //タスク->チャット・割り当て
    const tasks = await this.taskRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
    });

    for (let i = 0; i < tasks.length; i++) {
      const task = await this.taskRepository.findOne({
        where: {
          id: tasks[i].id,
        },
      });

      await this.chatRepository.delete({
        task: {
          id: tasks[i].id,
        },
      });

      await this.allocationRepository.delete({
        task: {
          id: tasks[i].id,
        },
      });

      //取得してきたものを削除
      await this.taskRepository.remove(task).catch(() => {
        new InternalServerErrorException();
      });
    }

    // リスト->リスト順序
    const lists = await this.listRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
    });

    for (let i = 0; i < lists.length; i++) {
      const listSort = await this.listSortRepository.findOne({
        where: {
          list: {
            id: lists[i].id,
          },
        },
      });

      //取得してきたものを削除
      await this.listSortRepository.remove(listSort).catch(() => {
        new InternalServerErrorException();
      });
    }

    await this.listRepository.delete({
      project: {
        id: projectId,
      },
    });
    //ログ
    await this.gameLogRepository.delete({
      project: {
        id: projectId,
      },
    });
    //招待
    await this.invitationRepository.delete({
      project: {
        id: projectId,
      },
    });
    //グループ
    await this.groupRepository.delete({
      project: {
        id: projectId,
      },
    });

    this.projectRepository.remove(project).catch((err) => {
      new InternalServerErrorException();
    });

    const user = this.userRepository.findOne(userId, {
      relations: [
        'interests',
        'certifications',
        'invitations',
        'invitations.project',
        'groups',
        'groups.project',
        'groups.project.groups',
        'groups.project.groups.user',
        'groups.project.groups.user.occupation',
        'groups.project.monster',
        'groups.project.monster.specie',
        'occupation',
      ],
    });

    return user;
  }
}
