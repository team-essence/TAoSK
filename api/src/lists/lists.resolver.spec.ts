import { Test, TestingModule } from '@nestjs/testing';
import { ListsResolver } from './lists.resolver';

describe('ListsResolver', () => {
  let resolver: ListsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListsResolver],
    }).compile();

    resolver = module.get<ListsResolver>(ListsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
