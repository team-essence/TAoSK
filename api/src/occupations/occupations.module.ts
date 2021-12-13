import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Occupation } from './occupation';
import { OccupationsService } from './occupations.service';
import { OccupationsResolver } from './occupations.resolver';
import { User } from 'src/users/user';
@Module({
  imports: [
    TypeOrmModule.forFeature([Occupation]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [OccupationsService, OccupationsResolver],
})
export class OccupationsModule {}
