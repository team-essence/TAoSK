import { Test, TestingModule } from '@nestjs/testing';
import { OccupationsResolver } from './occupations.resolver';

describe('OccupationsResolver', () => {
  let resolver: OccupationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OccupationsResolver],
    }).compile();

    resolver = module.get<OccupationsResolver>(OccupationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
