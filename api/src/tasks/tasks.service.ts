import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/lists/list';
import { Repository } from 'typeorm';
import { UpdateTaskSort } from './dto/updateTaskSort.input';
import { Task } from './task';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(List)
    private listRepository: Repository<List>,
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
      await this.taskRepository.save(task).catch((err) => {
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
}
