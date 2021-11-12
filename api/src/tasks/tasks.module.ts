import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task';
@Module({
  imports: [TypeOrmModule.forFeature([Task])],
})
export class TasksModule {}
