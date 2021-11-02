import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo';
import { TodosService } from './todos.service';

@Resolver()
export class TodosResolver {
  constructor(private todosService: TodosService) {}

  @Query(() => [Todo])
  public async todos(): Promise<Todo[]> {
    return await this.todosService.getAllTodos().catch((err) => {
      throw err;
    });
  }
}
