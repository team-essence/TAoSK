import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AssignTaskInput } from 'src/allocations/dto/newAllocation.input';
import { NewTaskInput } from './dto/newTask.input';
import { UpdateTaskSort } from './dto/updateTaskSort.input';
import { UpdatedTask } from './models/udatedTask.model';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Resolver()
export class TasksResolver {
  constructor(private taskService: TasksService) {}

  @Mutation(() => UpdatedTask)
  public async updateTaskSort(
    @Args({ name: 'updateTask' }) updateTask: UpdateTaskSort,
  ) {
    return await this.taskService.updateTaskSort(updateTask).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Task)
  public async addTask(
    @Args({ name: 'newTask' }) newTask: NewTaskInput,
    @Args({ name: 'assignTask' }) assignTask: AssignTaskInput,
  ) {
    return await this.taskService.addTask(newTask, assignTask).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Task)
  public async updateTaskTitle(
    @Args({ name: 'title' }) title: string,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    return await this.taskService.updateTitle(taskId, title).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Task)
  public async updateTaskOverview(
    @Args({ name: 'overview' }) overview: string,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    return await this.taskService
      .updateOverview(taskId, overview)
      .catch((err) => {
        throw err;
      });
  }

  @Mutation(() => Task)
  public async updateTaskParameters(
    @Args({ name: 'technology' }) technology: number,
    @Args({ name: 'achievement' }) achievement: number,
    @Args({ name: 'solution' }) solution: number,
    @Args({ name: 'motivation' }) motivation: number,
    @Args({ name: 'plan' }) plan: number,
    @Args({ name: 'design' }) design: number,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    return await this.taskService
      .updateParameters(
        taskId,
        technology,
        achievement,
        solution,
        motivation,
        plan,
        design,
      )
      .catch((err) => {
        throw err;
      });
  }

  @Mutation(() => Task)
  public async updateTaskEndDate(
    @Args({ name: 'end_date' }) end_date: string,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    return await this.taskService
      .updateEndDate(taskId, end_date)
      .catch((err) => {
        throw err;
      });
  }

  @Mutation(() => [Task])
  public async deleteTask(@Args({ name: 'taskId' }) taskId: number) {
    return await this.taskService.deleteTask(taskId).catch((err) => {
      throw err;
    });
  }
}
