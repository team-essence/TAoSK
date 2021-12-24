import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { UpdateListSort } from './dto/updateListSort.input';
import { ListSortsService } from './list-sorts.service';
import { PubSub } from 'graphql-subscriptions';
import { List } from 'src/lists/list';

@Resolver()
export class ListSortsResolver {
  private pubSub: PubSub;
  constructor(private listSortService: ListSortsService) {
    this.pubSub = new PubSub();
  }

  @Mutation(() => Boolean)
  public async updateListSort(
    @Args({ name: 'updateListSort' }) updateListSort: UpdateListSort,
  ) {
    const result = await this.listSortService
      .update(updateListSort)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateListByListSort', {
      updateListByListSort: {
        lists: result.lists,
        projectId: result.project_id,
      },
    });

    return result.result;
  }

  @Subscription((returns) => [List], {
    filter: (payload, variables) => {
      return payload.updateListByListSort.projectId === variables.projectId;
    },
    resolve: (values) => {
      return values.updateListByListSort.lists;
    },
  })
  updateListByListSort(
    @Args({ name: 'projectId', type: () => String }) projectId: string,
  ) {
    return this.pubSub.asyncIterator('updateListByListSort');
  }
}
