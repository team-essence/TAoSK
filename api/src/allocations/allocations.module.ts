import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allocation } from './allocation';
@Module({
  imports: [TypeOrmModule.forFeature([Allocation])],
})
export class AllocationsModule {}
