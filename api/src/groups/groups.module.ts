import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from 'src/invitations/invitation';
import { Project } from 'src/projects/project';
import { User } from 'src/users/user';
import { Group } from './group';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([Invitation]),
  ],
  providers: [GroupsResolver, GroupsService],
})
export class GroupsModule {}
