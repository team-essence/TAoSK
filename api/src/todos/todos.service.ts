import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewTodoInput } from './dto/new-todo.input';
import { Todo } from './entities/todo';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  public async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todoRepository.find({});

    if (!todos) throw new NotFoundException();

    return todos;
  }

  public async addTodo(newTodoData: NewTodoInput): Promise<Todo> {
    const newTodo = this.todoRepository.create(newTodoData);
    await this.todoRepository.save(newTodo).catch((err) => {
      new InternalServerErrorException();
    });
    return newTodo;
  }
}
