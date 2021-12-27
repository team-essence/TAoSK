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
import { Allocation } from 'src/allocations/allocation';

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
    @InjectRepository(Allocation)
    private allocationRepository: Repository<Allocation>,
  ) {}

  async create(newList: NewListInput): Promise<List[]> {
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

    let lists = await this.listRepository
      .createQueryBuilder('lists')
      .leftJoinAndSelect('lists.listSorts', 'listSorts')
      .leftJoinAndSelect('lists.tasks', 'tasks')
      .leftJoinAndSelect('lists.project', 'project')
      .leftJoinAndSelect('tasks.chats', 'chats')
      .leftJoinAndSelect('tasks.allocations', 'allocations')
      .leftJoinAndSelect('allocations.user', 'allocationsUser')
      .leftJoinAndSelect(
        'allocationsUser.occupation',
        'allocationUserOccupation',
      )
      .loadRelationCountAndMap('tasks.chatCount', 'tasks.chats')
      .where('project.id=:id', { id: newList.project_id })
      .getMany();

    const listSorts = lists.map((list) => {
      console.log(list.listSorts[0]);
      return {
        id: list.listSorts[0].id,
        sort: list.listSorts[0].task_list,
      };
    });
    listSorts.sort((a, b) => a.sort - b.sort);

    for (let index = 0; index < listSorts.length; index++) {
      const listSort = await this.listSortRepository.findOne(
        listSorts[index].id,
      );
      if (listSorts.length - 2 === index) {
        listSort.task_list = listSorts.length - 2;
      } else if (listSorts.length - 1 === index) {
        listSort.task_list = listSorts.length - 1;
      } else {
        listSort.task_list = index;
      }

      await this.listSortRepository.save(listSort).catch((err) => {
        throw err;
      });
    }

    lists = await this.listRepository
      .createQueryBuilder('lists')
      .leftJoinAndSelect('lists.listSorts', 'listSorts')
      .leftJoinAndSelect('lists.tasks', 'tasks')
      .leftJoinAndSelect('lists.project', 'project')
      .leftJoinAndSelect('tasks.chats', 'chats')
      .leftJoinAndSelect('tasks.allocations', 'allocations')
      .leftJoinAndSelect('allocations.user', 'allocationsUser')
      .leftJoinAndSelect(
        'allocationsUser.occupation',
        'allocationUserOccupation',
      )
      .loadRelationCountAndMap('tasks.chatCount', 'tasks.chats')
      .where('project.id=:id', { id: newList.project_id })
      .getMany();

    return lists;
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

  async updateListName(updateList: UpdateListInput): Promise<{
    lists: List[];
    project_id: string;
  }> {
    const list = await this.listRepository.findOne({
      where: {
        list_id: updateList.list_id,
      },
      relations: ['project'],
    });
    if (!list) throw new NotFoundException();

    list.name = updateList.name;
    await this.listRepository.save(list).catch((err) => {
      new InternalServerErrorException();
    });

    const lists = await this.listRepository
      .createQueryBuilder('lists')
      .leftJoinAndSelect('lists.listSorts', 'listSorts')
      .leftJoinAndSelect('lists.tasks', 'tasks')
      .leftJoinAndSelect('lists.project', 'project')
      .leftJoinAndSelect('tasks.chats', 'chats')
      .leftJoinAndSelect('tasks.allocations', 'allocations')
      .leftJoinAndSelect('allocations.user', 'allocationsUser')
      .leftJoinAndSelect(
        'allocationsUser.occupation',
        'allocationUserOccupation',
      )
      .loadRelationCountAndMap('tasks.chatCount', 'tasks.chats')
      .where('project.id=:id', { id: list.project.id })
      .getMany();

    return { lists, project_id: list.project.id };
  }

  async removeList(removeList: RemoveListInput): Promise<{
    result: boolean;
    lists: List[];
  }> {
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
        for (const task of tasks) {
          const allocations = await this.allocationRepository.find({
            task: {
              id: task.id,
            },
          });

          for (const allocation of allocations) {
            await this.allocationRepository.remove(allocation).catch((err) => {
              new InternalServerErrorException();
            });
          }

          await this.taskRepository.remove(task).catch((err) => {
            new InternalServerErrorException();
          });
        }
      }

      await this.listRepository.remove(list).catch((err) => {
        new InternalServerErrorException();
      });

      const lists = await this.listRepository.find({
        project: {
          id: removeList.project_id,
        },
      });

      const beforeListSorts: {
        task_list: number;
        list_sort: ListSort;
      }[] = [];

      for (const list of lists) {
        const listSort = await this.listSortRepository.findOne({
          where: {
            list: {
              id: list.id,
            },
          },
        });
        const init = {
          task_list: listSort.task_list,
          list_sort: listSort,
        };
        beforeListSorts.push(init);
        beforeListSorts.sort((a, b) => a.task_list - b.task_list);
      }

      for (const [index, beforeListSort] of beforeListSorts.entries()) {
        beforeListSort.list_sort.task_list = index;

        await this.listSortRepository
          .save(beforeListSort.list_sort)
          .catch((err) => {
            new InternalServerErrorException();
          });
      }

      const updatedLists = await this.listRepository
        .createQueryBuilder('lists')
        .leftJoinAndSelect('lists.listSorts', 'listSorts')
        .leftJoinAndSelect('lists.tasks', 'tasks')
        .leftJoinAndSelect('lists.project', 'project')
        .leftJoinAndSelect('tasks.chats', 'chats')
        .leftJoinAndSelect('tasks.allocations', 'allocations')
        .leftJoinAndSelect('allocations.user', 'allocationsUser')
        .leftJoinAndSelect(
          'allocationsUser.occupation',
          'allocationUserOccupation',
        )
        .loadRelationCountAndMap('tasks.chatCount', 'tasks.chats')
        .where('project.id=:id', { id: removeList.project_id })
        .getMany();

      return {
        result: true,
        lists: updatedLists,
      };
    } catch (error) {
      return {
        result: false,
        lists: [],
      };
    }
  }
}
