import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { Interest } from 'src/interests/interest';
import { Certification } from 'src/certifications/certification';
import { Group } from 'src/groups/group';
import { Invitation } from 'src/invitations/invitation';
import { GameLog } from 'src/game-logs/game-log';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Interest]),
    TypeOrmModule.forFeature([Certification]),
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([Invitation]),
    TypeOrmModule.forFeature([GameLog]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
