import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateListSort } from './dto/updateListSort.input';
import { ListSortsService } from './list-sorts.service';
import { ListSort } from './list-sort';
import { RemoveListSortInput } from './dto/removeListSort.input';

@Resolver()
export class ListSortsResolver {
  constructor(private listSortService: ListSortsService) {}

  @Mutation(() => Boolean)
  public async updateListSort(
    @Args({ name: 'updateListSort' }) updateListSort: UpdateListSort,
  ) {
    return await this.listSortService.update(updateListSort).catch((err) => {
      throw err;
    });
  }
}
