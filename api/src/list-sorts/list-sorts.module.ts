import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListSort } from './list-sort';
@Module({
  imports: [TypeOrmModule.forFeature([ListSort])],
})
export class ListSortsModule {}
