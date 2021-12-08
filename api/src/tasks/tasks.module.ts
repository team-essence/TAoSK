import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task';
import { Chat } from 'src/chats/chat';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { List } from 'src/lists/list';
import { Project } from 'src/projects/project';
import { User } from 'src/users/user';
import { Allocation } from 'src/allocations/allocation';
@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Chat]),
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
