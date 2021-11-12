import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitation';
@Module({
  imports: [TypeOrmModule.forFeature([Invitation])],
})
export class InvitationsModule {}
