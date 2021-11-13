import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task';
import { Chat } from 'src/chats/chat';
@Module({
  imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([Chat])],
})
export class TasksModule {}
