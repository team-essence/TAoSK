import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewListInput } from './dto/newList.input';
import { List } from './list';
import { v4 as uuidv4 } from 'uuid';
import { Project } from 'src/projects/project';
import { ListSort } from 'src/list-sorts/list-sort';
import { UpdateListInput } from './dto/updateList.input';
import { RemoveListInput } from './dto/removeList.input';
import { Task } from 'src/tasks/task';
import { User } from 'src/users/user';
import { GameLog } from 'src/game-logs/game-log';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(ListSort)
    private listSortRepository: Repository<ListSort>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(GameLog)
    private gameLogRepository: Repository<GameLog>,
  ) {}

  async create(newList: NewListInput): Promise<List> {
    const project = await this.projectRepository.findOne(newList.project_id);
    if (!project) throw new NotFoundException();

    const list = this.listRepository.create({
      list_id: uuidv4().slice(0, 8),
      name: newList.name,
      project,
    });
    await this.listRepository.save(list).catch((err) => {
      throw err;
    });

    const newListSort = this.listSortRepository.create({
      task_list: newList.task_list,
      list,
    });
    await this.listSortRepository.save(newListSort).catch((err) => {
      throw err;
    });

    const user = await this.userRepository.findOne(newList.user_id);
    if (!user) throw new NotFoundException();

    const log = this.gameLogRepository.create({
      context: 'リスト',
      user,
      project,
    });
    await this.gameLogRepository.save(log).catch((err) => {
      throw err;
    });

    return await this.listRepository.findOne(list.id, {
      relations: [
        'listSorts',
        'tasks',
        'tasks.allocations',
        'tasks.allocations.user',
      ],
    });
  }

  findByProjectId(projectId: string): Promise<List[]> {
    const lists = this.listRepository.find({
      relations: [
        'listSorts',
        'tasks',
        'tasks.allocations',
        'tasks.allocations.user',
      ],
      where: {
        project: {
          id: projectId,
        },
      },
    });

    if (!lists) throw new NotFoundException();

    return lists;
  }

  async updateListName(updateList: UpdateListInput): Promise<List> {
    const list = await this.listRepository.findOne({
      where: {
        list_id: updateList.list_id,
      },
    });
    list.name = updateList.name;
    await this.listRepository.save(list).catch((err) => {
      new InternalServerErrorException();
    });

    if (!list) throw new NotFoundException();

    return list;
  }

  async removeList(removeList: RemoveListInput): Promise<boolean> {
    try {
      const list = await this.listRepository.findOne(removeList.id);
      if (!list) throw new NotFoundException();

      const listSort = await this.listSortRepository.findOne({
        where: {
          list: {
            id: removeList.id,
          },
        },
      });

      const tasks = await this.taskRepository.find({
        where: {
          list: {
            id: removeList.id,
          },
        },
      });

      if (listSort) {
        await this.listSortRepository.remove(listSort).catch((err) => {
          new InternalServerErrorException();
        });
      }
      if (tasks) {
        await this.taskRepository.remove(tasks).catch((err) => {
          new InternalServerErrorException();
        });
      }

      await this.listRepository.remove(list).catch((err) => {
        new InternalServerErrorException();
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
