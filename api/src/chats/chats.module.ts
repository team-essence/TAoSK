import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/lists/list';
import { Task } from 'src/tasks/task';
import { User } from 'src/users/user';
import { Chat } from './chat';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([List]),
  ],
  providers: [ChatsResolver, ChatsService],
})
export class ChatsModule {}
