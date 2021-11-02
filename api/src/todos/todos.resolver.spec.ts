import { Test, TestingModule } from '@nestjs/testing';
import { TodosResolver } from './todos.resolver';

describe('TodosResolver', () => {
  let resolver: TodosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosResolver],
    }).compile();

    resolver = module.get<TodosResolver>(TodosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
