import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list';
import { ListSort } from 'src/list-sorts/list-sort';
import { Task } from 'src/tasks/task';
import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';
import { Project } from 'src/projects/project';
import { User } from 'src/users/user';
import { GameLog } from 'src/game-logs/game-log';
@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([ListSort]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([GameLog]),
  ],
  providers: [ListsService, ListsResolver],
})
export class ListsModule {}
