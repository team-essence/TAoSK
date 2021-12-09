import { Test, TestingModule } from '@nestjs/testing';
import { GameLogsResolver } from './game-logs.resolver';

describe('GameLogsResolver', () => {
  let resolver: GameLogsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameLogsResolver],
    }).compile();

    resolver = module.get<GameLogsResolver>(GameLogsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
