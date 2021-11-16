import { Test, TestingModule } from '@nestjs/testing';
import { GroupsResolver } from './groups.resolver';

describe('GroupsResolver', () => {
  let resolver: GroupsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsResolver],
    }).compile();

    resolver = module.get<GroupsResolver>(GroupsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
