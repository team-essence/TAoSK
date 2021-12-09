import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GameLog } from './game-log';
import { GameLogsService } from './game-logs.service';
import { GameLogsResolver } from './game-logs.resolver';
import { User } from 'src/users/user';
import { Project } from 'src/projects/project';
@Module({
  imports: [
    TypeOrmModule.forFeature([GameLog]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Project]),
  ],
  providers: [GameLogsService, GameLogsResolver],
})
export class GameLogsModule {}
