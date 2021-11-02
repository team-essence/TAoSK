import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewTodoInput } from './dto/new-todo.input';
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

  @Mutation(() => Todo)
  public async addNewTodo(
    @Args('newTodoData') newTodoData: NewTodoInput,
  ): Promise<Todo> {
    return await this.todosService.addTodo(newTodoData).catch((err) => {
      throw err;
    });
  }
}
