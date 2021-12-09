import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Allocation } from 'src/allocations/allocation';
import { assignTaskInput } from 'src/allocations/dto/newAllocation.input';
import { List } from 'src/lists/list';
import { Project } from 'src/projects/project';
import { User } from 'src/users/user';
import { Repository } from 'typeorm';
import { NewTaskInput } from './dto/newTask.input';
import { UpdateTaskSort } from './dto/updateTaskSort.input';
import { Task } from './task';

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
  ) {}

  async updateTaskSort(updateTask: UpdateTaskSort): Promise<Task[]> {
    for (let index = 0; index < updateTask.tasks.length; index++) {
      const task = await this.taskRepository.findOne(
        updateTask.tasks[index].id,
      );
      if (!task) throw new NotFoundException();

      const list = await this.listRepository.findOne(
        updateTask.tasks[index].list_id,
      );
      if (!list) throw new NotFoundException();

      task.vertical_sort = updateTask.tasks[index].vertical_sort;
      task.list = list;

      await this.taskRepository.save(task).catch(() => {
        new InternalServerErrorException();
      });
    }

    const tasks = this.taskRepository.find({
      relations: ['project'],
      where: {
        project: {
          id: updateTask.project_id,
        },
      },
    });
    if (!tasks) throw new NotFoundException();
    return tasks;
  }

  async addTask(
    newTask: NewTaskInput,
    assignUser: assignTaskInput,
  ): Promise<Task> {
    const project = await this.projectRepository.findOne(newTask.project_id);
    if (!project) throw new NotFoundException();

    const list = await this.listRepository.findOne(newTask.list_id);
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

    await this.taskRepository.save(task).catch((err) => {
      throw err;
    });

    const taskId = task.id;

    for (let index = 0; index < assignUser.users.length; index++) {
      const user = await this.userRepository.findOne(
        assignUser.users[index].user_id,
      );

      const task = await this.taskRepository.findOne(taskId);

      const allocation = this.allocationRepository.create({ user, task });

      await this.allocationRepository.save(allocation).catch(() => {
        new InternalServerErrorException();
      });
    }

    const tasks = this.taskRepository.findOne(taskId, {
      relations: ['allocations', 'allocations.user'],
    });

    return tasks;
  }

  async updateTitle(taskId: number, title: string): Promise<Task> {
    let task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    task.title = title;

    await this.taskRepository.save(task).catch(() => {
      new InternalServerErrorException();
    });

    task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    return task;
  }

  async updateOverview(taskId: number, overview: string): Promise<Task> {
    let task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    task.overview = overview;

    await this.taskRepository.save(task).catch(() => {
      new InternalServerErrorException();
    });

    task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    return task;
  }

  async updateParameters(
    taskId: number,
    technology: number,
    achievement: number,
    solution: number,
    motivation: number,
    plan: number,
    design: number,
  ): Promise<Task> {
    let task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    task.technology = technology;
    task.achievement = achievement;
    task.solution = solution;
    task.motivation = motivation;
    task.plan = plan;
    task.design = design;

    await this.taskRepository.save(task).catch(() => {
      new InternalServerErrorException();
    });

    task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    return task;
  }

  async updateEndDate(taskId: number, end_date: string): Promise<Task> {
    let task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    task.end_date = end_date;

    await this.taskRepository.save(task).catch(() => {
      new InternalServerErrorException();
    });

    task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    return task;
  }

  async deleteTask(taskId: number): Promise<Task[]> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    await this.taskRepository.remove(task).catch(() => {
      new InternalServerErrorException();
    });

    const tasks = this.taskRepository.find({
      relations: ['project', 'list'],
    });

    return tasks;
  }
}
