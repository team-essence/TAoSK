import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project';
import { Group } from 'src/groups/group';
import { Invitation } from 'src/invitations/invitation';
import { List } from 'src/lists/list';
import { Task } from 'src/tasks/task';
import { GameLog } from 'src/game-logs/game-log';
@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([Invitation]),
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([GameLog]),
  ],
})
export class ProjectsModule {}
