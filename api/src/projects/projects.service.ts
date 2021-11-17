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
import { Repository } from 'typeorm';
import { NewProjectInput, SelectUser } from './dto/newProject.input';
import { Project } from './project';
import { v4 as uuidv4 } from 'uuid';

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

  findProjectOne(id: number): Promise<Project> {
    const project = this.projectRepository.findOne(id, {
      relations: [
        'monster',
        'monster.specie',
        'invitations',
        'lists',
        'lists.listSorts',
        'tasks',
        'gameLogs',
        'groups',
        'groups.user',
      ],
    });

    if (!project) throw new NotFoundException();

    return project;
  }
}
