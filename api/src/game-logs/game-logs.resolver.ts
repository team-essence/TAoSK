import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewLogInput } from './dto/newGameLog.input';
import { GameLog } from './game-log';
import { GameLogsService } from './game-logs.service';

@Resolver()
export class GameLogsResolver {
  constructor(private gameLogService: GameLogsService) {}

  @Query(() => [GameLog])
  public async findByProjectId(
    @Args({ name: 'project_id' }) project_id: string,
  ) {
    return await this.gameLogService
      .findByProjectId(project_id)
      .catch((err) => {
        throw err;
      });
  }

  @Mutation(() => GameLog)
  public async createGameLog(@Args({ name: 'newLog' }) newLog: NewLogInput) {
    return await this.gameLogService.create(newLog).catch((err) => {
      throw err;
    });
  }
}
