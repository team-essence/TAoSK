import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Allocation } from 'src/allocations/allocation';
import {
  AssignTaskInput,
  NewAllocationInput,
} from 'src/allocations/dto/newAllocation.input';
import { Chat } from 'src/chats/chat';
import { GameLog } from 'src/game-logs/game-log';
import { Group } from 'src/groups/group';
import { List } from 'src/lists/list';
import { Project } from 'src/projects/project';
import { User } from 'src/users/user';
import { Repository } from 'typeorm';
import { NewTaskInput } from './dto/newTask.input';
import { UpdateTaskSort } from './dto/updateTaskSort.input';
import { UpdatedTask } from './models/udatedTask.model';
import { Task } from './task';
import StatusPointUtil from './utils/StatusPointUtil';
import * as io from 'socket.io-client';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(List)
    private listRepository: Repository<List>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Allocation)
    private allocationRepository: Repository<Allocation>,
    @InjectRepository(GameLog)
    private gameLogRepository: Repository<GameLog>,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private readonly config: ConfigService,
  ) {}

  async updateTaskSort(updateTask: UpdateTaskSort): Promise<{
    lists: List[];
    updatedTask: UpdatedTask;
    logs: {
      isUpdate: boolean;
      logs: GameLog[];
    };
    allocationUsers: User[];
    groups: Group[];
  }> {
    const allocationUsers: User[] = [];
    const logs = {
      isUpdate: false,
      logs: [],
    };
    const returnObjectTask = {
      id: 0,
      high_status_name: '',
      is_completed: false,
      project_id: updateTask.project_id,
    };

    for (let index = 0; index < updateTask.tasks.length; index++) {
      const task = await this.taskRepository.findOne(
        updateTask.tasks[index].id,
        {
          relations: ['allocations', 'allocations.user'],
        },
      );
      if (!task) throw new NotFoundException();

      const list = await this.listRepository.findOne({
        where: {
          list_id: updateTask.tasks[index].list_id,
        },
      });
      if (!list) throw new NotFoundException();

      task.vertical_sort = updateTask.tasks[index].vertical_sort;
      task.list = list;

      const totalStatus = StatusPointUtil.totalStatus(
        task.technology,
        task.achievement,
        task.solution,
        task.motivation,
        task.design,
        task.plan,
      );

      if (!task.completed_flg && updateTask.tasks[index].completed_flg) {
        const highStatus = StatusPointUtil.highStatus(
          task.technology,
          task.achievement,
          task.solution,
          task.motivation,
          task.design,
          task.plan,
        );
        returnObjectTask.id = task.id;
        returnObjectTask.is_completed = true;
        returnObjectTask.high_status_name = highStatus.status_name;
        logs.isUpdate = true;

        task.completed_flg = updateTask.tasks[index].completed_flg;

        const project = await this.projectRepository.findOne(
          updateTask.project_id,
        );
        if (!project) throw new NotFoundException();

        // 経験値付与
        task.allocations.map(async (allocation) => {
          const user = await this.userRepository.findOne(allocation.user.id, {
            relations: [
              'interests',
              'certifications',
              'invitations',
              'invitations.project',
              'groups',
              'groups.project',
              'groups.project.tasks',
              'groups.project.groups',
              'groups.project.groups.user',
              'groups.project.groups.user.occupation',
              'groups.project.monster',
              'groups.project.monster.specie',
              'occupation',
            ],
          });

          const beforeLevel = (user.exp / 100) | 0;
          const sumExp = user.exp + totalStatus;
          const afterLevel = (sumExp / 100) | 0;

          if (afterLevel > beforeLevel) {
            const log = this.gameLogRepository.create({
              context: 'レベル',
              user,
              project,
            });
            this.gameLogRepository.save(log).catch((err) => {
              throw err;
            });
          }

          user.exp = sumExp;
          user.technology += task.technology;
          user.achievement += task.achievement;
          user.solution += task.solution;
          user.motivation += task.motivation;
          user.design += task.design;
          user.plan += task.plan;
          await this.userRepository.save(user).catch((err) => {
            throw err;
          });

          allocationUsers.push(
            await this.userRepository.findOne(allocation.user.id, {
              relations: [
                'interests',
                'certifications',
                'invitations',
                'invitations.project',
                'groups',
                'groups.project',
                'groups.project.tasks',
                'groups.project.groups',
                'groups.project.groups.user',
                'groups.project.groups.user.occupation',
                'groups.project.monster',
                'groups.project.monster.specie',
                'occupation',
              ],
            }),
          );
        });

        // ログ
        const logUser = await this.userRepository.findOne(updateTask.user_id);
        if (!logUser) throw new NotFoundException();
        const log = this.gameLogRepository.create({
          context: `${totalStatus}のダメージ`,
          user: logUser,
          project,
        });
        this.gameLogRepository.save(log).catch((err) => {
          throw err;
        });
      }

      if (task.completed_flg && !updateTask.tasks[index].completed_flg) {
        task.completed_flg = updateTask.tasks[index].completed_flg;

        task.allocations.map(async (allocation) => {
          const user = await this.userRepository.findOne(allocation.user.id);
          if (!user) throw new NotFoundException();

          user.exp -= totalStatus;
          user.technology -= task.technology;
          user.achievement -= task.achievement;
          user.solution -= task.solution;
          user.motivation -= task.motivation;
          user.design -= task.design;
          user.plan -= task.plan;
          await this.userRepository.save(user).catch((err) => {
            throw err;
          });

          allocationUsers.push(
            await this.userRepository.findOne(allocation.user.id, {
              relations: [
                'interests',
                'certifications',
                'invitations',
                'invitations.project',
                'groups',
                'groups.project',
                'groups.project.tasks',
                'groups.project.groups',
                'groups.project.groups.user',
                'groups.project.groups.user.occupation',
                'groups.project.monster',
                'groups.project.monster.specie',
                'occupation',
              ],
            }),
          );
        });
      }

      await this.taskRepository.save(task).catch((err) => {
        new InternalServerErrorException();
      });
    }

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
      .where('project.id=:id', { id: updateTask.project_id })
      .getMany();

    const gameLogs = await this.gameLogRepository.find({
      where: {
        project: {
          id: updateTask.project_id,
        },
      },
      order: {
        id: 'DESC',
      },
      take: 25,
      relations: ['user', 'project'],
    });
    logs.logs = gameLogs;

    const groups = await this.groupRepository.find({
      where: {
        project: {
          id: updateTask.project_id,
        },
      },
      relations: [
        'user',
        'user.interests',
        'user.certifications',
        'user.occupation',
      ],
    });

    return {
      lists: lists,
      updatedTask: returnObjectTask,
      logs,
      allocationUsers,
      groups,
    };
  }

  async addTask(
    newTask: NewTaskInput,
    assignUser: AssignTaskInput,
  ): Promise<{
    lists: List[];
    logs: GameLog[];
  }> {
    const tasks = await this.taskRepository.find({
      where: {
        project: {
          id: newTask.project_id,
        },
      },
    });

    const project = await this.projectRepository.findOne(newTask.project_id);
    if (!project) throw new NotFoundException();

    const list = await this.listRepository.findOne({
      where: {
        list_id: newTask.list_id,
      },
    });
    if (!list) throw new NotFoundException();

    const task = this.taskRepository.create({
      title: newTask.title,
      overview: newTask.overview,
      technology: newTask.technology,
      achievement: newTask.achievement,
      solution: newTask.solution,
      motivation: newTask.motivation,
      plan: newTask.plan,
      design: newTask.design,
      vertical_sort: newTask.vertical_sort,
      end_date: newTask.end_date,
      completed_flg: newTask.completed_flg,
      project,
      list,
    });

    const user = await this.userRepository.findOne(newTask.user_id);
    if (!user) throw new NotFoundException();

    if (!!tasks.length) {
      const log = this.gameLogRepository.create({
        context: 'タスク',
        user,
        project,
      });
      await this.gameLogRepository.save(log).catch((err) => {
        throw err;
      });
    } else {
      const log = this.gameLogRepository.create({
        context: 'モンスター',
        user,
        project,
      });
      await this.gameLogRepository.save(log).catch((err) => {
        throw err;
      });
    }

    await this.taskRepository.save(task).catch((err) => {
      throw err;
    });

    for (let index = 0; index < assignUser.users.length; index++) {
      const user = await this.userRepository.findOne(
        assignUser.users[index].user_id,
      );

      const allocation = this.allocationRepository.create({ user, task });

      await this.allocationRepository.save(allocation).catch(() => {
        new InternalServerErrorException();
      });
    }

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
      .where('project.id=:id', { id: newTask.project_id })
      .getMany();
    console.log(lists);

    const logs = await this.gameLogRepository.find({
      where: {
        project: {
          id: newTask.project_id,
        },
      },
      order: {
        id: 'DESC',
      },
      take: 25,
      relations: ['user', 'project'],
    });

    return {
      lists,
      logs,
    };
  }

  async updateTitle(
    taskId: number,
    title: string,
  ): Promise<{ lists: List[]; project_id: string }> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
      relations: ['project'],
    });

    task.title = title;

    await this.taskRepository.save(task).catch(() => {
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
      .where('project.id=:id', { id: task.project.id })
      .getMany();

    return { lists, project_id: task.project.id };
  }

  async updateOverview(
    taskId: number,
    overview: string,
  ): Promise<{ lists: List[]; project_id: string }> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
      relations: ['project'],
    });

    task.overview = overview;

    await this.taskRepository.save(task).catch(() => {
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
      .where('project.id=:id', { id: task.project.id })
      .getMany();

    return { lists, project_id: task.project.id };
  }

  async updateParameters(
    taskId: number,
    technology: number,
    achievement: number,
    solution: number,
    motivation: number,
    plan: number,
    design: number,
  ): Promise<{ lists: List[]; project_id: string }> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
      relations: ['project'],
    });

    if (task.project.tasks.map((task) => task.completed_flg === true)) {
      const url = this.config.get('SOCKET_CLIENT_EVENTS');
      const socket = io(url);
      task.project.groups;
      const usersId = task.project.groups.map((menber) => menber.user.id);
      socket.emit('events', {
        sender: '',
        room: 'general',
        message: usersId,
      });
    }

    task.technology = technology;
    task.achievement = achievement;
    task.solution = solution;
    task.motivation = motivation;
    task.plan = plan;
    task.design = design;

    await this.taskRepository.save(task).catch(() => {
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
      .where('project.id=:id', { id: task.project.id })
      .getMany();

    return { lists, project_id: task.project.id };
  }

  async updateEndDate(
    taskId: number,
    end_date: string,
  ): Promise<{ lists: List[]; project_id: string }> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
      relations: ['project'],
    });

    task.end_date = end_date;

    await this.taskRepository.save(task).catch(() => {
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
      .where('project.id=:id', { id: task.project.id })
      .getMany();

    return { lists, project_id: task.project.id };
  }

  async deleteTask(
    taskId: number,
  ): Promise<{ lists: List[]; project_id: string; allocationUsers: User[] }> {
    const allocationUsers: User[] = [];
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
      relations: ['project', 'allocations', 'allocations.user'],
    });
    const projectId = task.project.id;

    const totalStatus = StatusPointUtil.totalStatus(
      task.technology,
      task.achievement,
      task.solution,
      task.motivation,
      task.design,
      task.plan,
    );

    if (task.completed_flg) {
      for (let index = 0; index < task.allocations.length; index++) {
        const allocation = task.allocations[index];

        const user = await this.userRepository.findOne(allocation.user.id);
        if (!user) throw new NotFoundException();

        user.exp -= totalStatus;
        user.technology -= task.technology;
        user.achievement -= task.achievement;
        user.solution -= task.solution;
        user.motivation -= task.motivation;
        user.design -= task.design;
        user.plan -= task.plan;
        await this.userRepository.save(user).catch((err) => {
          throw err;
        });

        allocationUsers.push(
          await this.userRepository.findOne(allocation.user.id, {
            relations: [
              'interests',
              'certifications',
              'invitations',
              'invitations.project',
              'groups',
              'groups.project',
              'groups.project.tasks',
              'groups.project.groups',
              'groups.project.groups.user',
              'groups.project.groups.user.occupation',
              'groups.project.monster',
              'groups.project.monster.specie',
              'occupation',
            ],
          }),
        );
      }
    }

    await this.allocationRepository.delete({
      task: {
        id: taskId,
      },
    });
    await this.chatRepository.delete({
      task: {
        id: taskId,
      },
    });
    await this.taskRepository.remove(task).catch(() => {
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
      .where('project.id=:id', { id: projectId })
      .getMany();

    return { lists, project_id: projectId, allocationUsers };
  }

  async assign({
    newAllocation,
  }: {
    newAllocation: NewAllocationInput;
  }): Promise<{ lists: List[]; project_id: string }> {
    const user = await this.userRepository.findOne(newAllocation.user_id);
    if (!user) throw new NotFoundException();

    const task = await this.taskRepository.findOne(newAllocation.task_id, {
      relations: ['project'],
    });
    if (!task) throw new NotFoundException();

    const allocation = this.allocationRepository.create({
      user,
      task,
    });

    await this.allocationRepository.save(allocation).catch(() => {
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
      .where('project.id=:id', { id: task.project.id })
      .getMany();

    return { lists, project_id: task.project.id };
  }

  async unassign(
    userId: string,
    taskId,
  ): Promise<{ lists: List[]; project_id: string }> {
    const allocation = await this.allocationRepository.findOne({
      user: {
        id: userId,
      },
      task: {
        id: taskId,
      },
    });

    await this.allocationRepository.remove(allocation).catch(() => {
      new InternalServerErrorException();
    });

    const task = await this.taskRepository.findOne(taskId, {
      relations: ['project'],
    });
    if (!task) throw new NotFoundException();

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
      .where('project.id=:id', { id: task.project.id })
      .getMany();

    return { lists, project_id: task.project.id };
  }
}
