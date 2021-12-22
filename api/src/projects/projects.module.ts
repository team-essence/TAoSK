import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project';
import { Group } from 'src/groups/group';
import { Invitation } from 'src/invitations/invitation';
import { List } from 'src/lists/list';
import { Task } from 'src/tasks/task';
import { GameLog } from 'src/game-logs/game-log';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { User } from 'src/users/user';
import { Monster } from 'src/monsters/monster';
import { ListSort } from 'src/list-sorts/list-sort';
import { Allocation } from 'src/allocations/allocation';
import { Chat } from 'src/chats/chat';
@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([Invitation]),
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([ListSort]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([GameLog]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Monster]),
    TypeOrmModule.forFeature([GameLog]),
    TypeOrmModule.forFeature([Allocation]),
    TypeOrmModule.forFeature([Chat]),
  ],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
