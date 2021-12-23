import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Allocation } from 'src/allocations/allocation';
import {
  AssignTaskInput,
  NewAllocationInput,
} from 'src/allocations/dto/newAllocation.input';
import { GameLog } from 'src/game-logs/game-log';
import { List } from 'src/lists/list';
import { NewTaskInput } from './dto/newTask.input';
import { UpdateTaskSort } from './dto/updateTaskSort.input';
import { UpdatedTask } from './models/udatedTask.model';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Resolver()
export class TasksResolver {
  private pubSub: PubSub;
  constructor(private taskService: TasksService) {
    this.pubSub = new PubSub();
  }

  @Mutation(() => UpdatedTask)
  public async updateTaskSort(
    @Args({ name: 'updateTask' }) updateTask: UpdateTaskSort,
  ) {
    const result = await this.taskService
      .updateTaskSort(updateTask)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateList', {
      updateList: result.lists,
    });

    this.pubSub.publish('endTask', {
      endTask: result.updatedTask,
    });

    if (result.logs.isUpdate) {
      this.pubSub.publish('updateLogsByTask', {
        updateLogsByTask: result.logs.logs,
      });
    }

    return result.updatedTask;
  }

  @Mutation(() => [List])
  public async addTask(
    @Args({ name: 'newTask' }) newTask: NewTaskInput,
    @Args({ name: 'assignTask' }) assignTask: AssignTaskInput,
  ) {
    const result = await this.taskService
      .addTask(newTask, assignTask)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateList', {
      updateList: result.lists,
    });

    this.pubSub.publish('updateLogsByTask', {
      updateLogsByTask: result.logs,
    });

    return result.lists;
  }

  @Mutation(() => [List])
  public async updateTaskTitle(
    @Args({ name: 'title' }) title: string,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    const lists = await this.taskService
      .updateTitle(taskId, title)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateList', {
      updateList: lists,
    });

    return lists;
  }

  @Mutation(() => [List])
  public async updateTaskOverview(
    @Args({ name: 'overview' }) overview: string,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    const lists = await this.taskService
      .updateOverview(taskId, overview)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateList', {
      updateList: lists,
    });

    return lists;
  }

  @Mutation(() => [List])
  public async updateTaskParameters(
    @Args({ name: 'technology' }) technology: number,
    @Args({ name: 'achievement' }) achievement: number,
    @Args({ name: 'solution' }) solution: number,
    @Args({ name: 'motivation' }) motivation: number,
    @Args({ name: 'plan' }) plan: number,
    @Args({ name: 'design' }) design: number,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    const lists = await this.taskService
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

    this.pubSub.publish('updateList', {
      updateList: lists,
    });

    return lists;
  }

  @Mutation(() => [List])
  public async updateTaskEndDate(
    @Args({ name: 'end_date' }) end_date: string,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    const lists = await this.taskService
      .updateEndDate(taskId, end_date)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateList', {
      updateList: lists,
    });

    return lists;
  }

  @Mutation(() => [Task])
  public async deleteTask(@Args({ name: 'taskId' }) taskId: number) {
    return await this.taskService.deleteTask(taskId).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => [List])
  public async createAllocation(
    @Args({ name: 'newAllocation' }) newAllocation: NewAllocationInput,
  ) {
    const lists = await this.taskService
      .assign({ newAllocation })
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateList', {
      updateList: lists,
    });

    return lists;
  }

  @Mutation(() => [List])
  public async unAssignTask(
    @Args({ name: 'user_id' }) userId: string,
    @Args({ name: 'task_id' }) taskId: number,
  ) {
    const lists = await this.taskService
      .unassign(userId, taskId)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateList', {
      updateList: lists,
    });

    return lists;
  }

  @Subscription((returns) => [List], {
    filter: (payload, variables) => {
      return payload.updateList.map((list: List) => {
        return list.project.id === variables.projectId;
      });
    },
  })
  updateList(
    @Args({ name: 'projectId', type: () => String }) projectId: string,
  ) {
    return this.pubSub.asyncIterator('updateList');
  }

  @Subscription((returns) => UpdatedTask, {
    filter: (payload, variables) => {
      return (
        payload.endTask.is_completed &&
        payload.endTask.project_id === variables.projectId
      );
    },
  })
  endTask(@Args({ name: 'projectId', type: () => String }) projectId: string) {
    return this.pubSub.asyncIterator('endTask');
  }

  @Subscription((returns) => [GameLog], {
    filter: (payload, variables) => {
      return payload.updateLogsByTask.map((logs: GameLog) => {
        return logs.project.id === variables.projectId;
      });
    },
  })
  updateLogsByTask(
    @Args({ name: 'projectId', type: () => String }) projectId: string,
  ) {
    return this.pubSub.asyncIterator('updateLogsByTask');
  }
}
