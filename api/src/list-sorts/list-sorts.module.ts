import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListSort } from './list-sort';
import { ListSortsResolver } from './list-sorts.resolver';
import { ListSortsService } from './list-sorts.service';
@Module({
  imports: [TypeOrmModule.forFeature([ListSort])],
  providers: [ListSortsResolver, ListSortsService],
})
export class ListSortsModule {}
