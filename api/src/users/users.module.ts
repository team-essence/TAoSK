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
import { Project } from 'src/projects/project';
import { Occupation } from 'src/occupations/occupation';
import { BrainWavesController } from 'src/brain-waves/brain-waves.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Interest]),
    TypeOrmModule.forFeature([Certification]),
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([Invitation]),
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([GameLog]),
    TypeOrmModule.forFeature([Occupation]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  controllers: [BrainWavesController],
})
export class UsersModule {}
