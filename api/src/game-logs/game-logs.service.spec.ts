import { Test, TestingModule } from '@nestjs/testing';
import { GameLogsService } from './game-logs.service';

describe('GameLogsService', () => {
  let service: GameLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameLogsService],
    }).compile();

    service = module.get<GameLogsService>(GameLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
