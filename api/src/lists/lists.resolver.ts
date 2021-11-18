import { Args, Query, Resolver } from '@nestjs/graphql';
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
}
