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
  ) {}

  async create({
    newProject,
    selectUser,
  }: {
    newProject: NewProjectInput;
    selectUser: SelectUser;
  }): Promise<Project> {
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

    return project;
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
}
