import { Test, TestingModule } from '@nestjs/testing';
import { ListSortsResolver } from './list-sorts.resolver';

describe('ListSortsResolver', () => {
  let resolver: ListSortsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListSortsResolver],
    }).compile();

    resolver = module.get<ListSortsResolver>(ListSortsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
