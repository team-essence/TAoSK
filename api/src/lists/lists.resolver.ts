import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewListInput } from './dto/newList.input';
import { RemoveListInput } from './dto/removeList.input';
import { UpdateListInput } from './dto/updateList.input';
import { List } from './list';
import { ListsService } from './lists.service';

@Resolver()
export class ListsResolver {
  private pubSub: PubSub;
  constructor(private listsService: ListsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [List])
  public async listsByProjectId(
    @Args({ name: 'projectId' }) projectId: string,
  ): Promise<List[]> {
    return await this.listsService.findByProjectId(projectId).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => [List])
  public async createList(@Args({ name: 'newList' }) newList: NewListInput) {
    const lists = await this.listsService.create(newList).catch((err) => {
      throw err;
    });

    this.pubSub.publish('updateListByList', {
      updateListByList: {
        projectId: newList.project_id,
        lists,
      },
    });

    return lists;
  }

  @Mutation(() => [List])
  public async updateListName(
    @Args({ name: 'updateList' }) updateList: UpdateListInput,
  ) {
    const result = await this.listsService
      .updateListName(updateList)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateListByList', {
      updateListByList: {
        projectId: result.project_id,
        lists: result.lists,
      },
    });

    return result.lists;
  }

  @Mutation(() => Boolean)
  public async removeList(
    @Args({ name: 'removeList', nullable: true }) removeList: RemoveListInput,
  ) {
    const result = await this.listsService
      .removeList(removeList)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateListByList', {
      updateListByList: {
        projectId: removeList.project_id,
        lists: result.lists,
      },
    });

    return result.result;
  }

  @Subscription((returns) => [List], {
    filter: (payload, variables) => {
      return payload.updateListByList.projectId === variables.projectId;
    },
    resolve: (values) => {
      return values.updateListByList.lists;
    },
  })
  updateListByList(
    @Args({ name: 'projectId', type: () => String }) projectId: string,
  ) {
    return this.pubSub.asyncIterator('updateListByList');
  }
}
