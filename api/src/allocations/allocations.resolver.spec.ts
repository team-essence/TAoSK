import { Test, TestingModule } from '@nestjs/testing';
import { AllocationsResolver } from './allocations.resolver';

describe('AllocationsResolver', () => {
  let resolver: AllocationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllocationsResolver],
    }).compile();

    resolver = module.get<AllocationsResolver>(AllocationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
