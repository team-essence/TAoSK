import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NewTaskInput } from './dto/newTask.input';
import { UpdateTaskSort } from './dto/updateTaskSort.input';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Resolver()
export class TasksResolver {
  constructor(private taskService: TasksService) {}

  @Mutation(() => [Task])
  public async updateTaskSort(
    @Args({ name: 'updateTask' }) updateTask: UpdateTaskSort,
  ) {
    return await this.taskService.updateTaskSort(updateTask).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Task)
  public async addTask(@Args({ name: 'newTask' }) newTask: NewTaskInput) {
    return await this.taskService.addTask(newTask).catch((err) => {
      throw err;
    });
  }
}
