import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list';
import { ListSort } from 'src/list-sorts/list-sort';
import { Task } from 'src/tasks/task';
@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([ListSort]),
    TypeOrmModule.forFeature([Task]),
  ],
})
export class ListsModule {}
