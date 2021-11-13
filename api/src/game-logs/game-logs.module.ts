import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GameLog } from './game-log';
@Module({
  imports: [TypeOrmModule.forFeature([GameLog])],
})
export class GameLogsModule {}
