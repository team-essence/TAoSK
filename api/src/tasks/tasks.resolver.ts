import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
}
