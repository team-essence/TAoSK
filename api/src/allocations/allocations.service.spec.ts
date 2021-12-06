import { Test, TestingModule } from '@nestjs/testing';
import { AllocationsService } from './allocations.service';

describe('AllocationsService', () => {
  let service: AllocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllocationsService],
    }).compile();

    service = module.get<AllocationsService>(AllocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
