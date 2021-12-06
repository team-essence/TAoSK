import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allocation } from './allocation';
import { AllocationsService } from './allocations.service';
import { AllocationsResolver } from './allocations.resolver';
import { User } from 'src/users/user';
import { Task } from 'src/tasks/task';
@Module({
  imports: [
    TypeOrmModule.forFeature([Allocation]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [AllocationsService, AllocationsResolver],
})
export class AllocationsModule {}
