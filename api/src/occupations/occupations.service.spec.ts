import { Test, TestingModule } from '@nestjs/testing';
import { OccupationsService } from './occupations.service';

describe('OccupationsService', () => {
  let service: OccupationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OccupationsService],
    }).compile();

    service = module.get<OccupationsService>(OccupationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
