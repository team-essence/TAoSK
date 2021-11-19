import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewListInput } from './dto/newList.input';
import { List } from './list';
import { ListsService } from './lists.service';

@Resolver()
export class ListsResolver {
  constructor(private listsService: ListsService) {}

  @Query(() => [List])
  public async listsByProjectId(
    @Args({ name: 'projectId' }) projectId: string,
  ): Promise<List[]> {
    return this.listsService.findByProjectId(projectId).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => List)
  public async createList(@Args({ name: 'newList' }) newList: NewListInput) {
    return this.listsService.create(newList).catch((err) => {
      throw err;
    });
  }
}
