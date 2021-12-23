import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/lists/list';
import { ListSort } from './list-sort';
import { ListSortsResolver } from './list-sorts.resolver';
import { ListSortsService } from './list-sorts.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([ListSort]),
    TypeOrmModule.forFeature([List]),
  ],
  providers: [ListSortsResolver, ListSortsService],
})
export class ListSortsModule {}
