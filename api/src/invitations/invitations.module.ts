import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/project';
import { User } from 'src/users/user';
import { Invitation } from './invitation';
import { InvitationsResolver } from './invitations.resolver';
import { InvitationsService } from './invitations.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Project]),
  ],
  providers: [InvitationsResolver, InvitationsService],
})
export class InvitationsModule {}
