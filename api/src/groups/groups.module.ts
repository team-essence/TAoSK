import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';
@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupsResolver, GroupsService],
})
export class GroupsModule {}
