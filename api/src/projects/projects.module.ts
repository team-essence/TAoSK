import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project';
import { Group } from 'src/groups/group';
import { Invitation } from 'src/invitations/invitation';
import { List } from 'src/lists/list';
import { Task } from 'src/tasks/task';
import { Log } from 'src/logs/log';
@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([Invitation]),
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Log]),
  ],
})
export class ProjectsModule {}
