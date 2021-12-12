import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Occupation } from './occupation';
import { OccupationsService } from './occupations.service';
import { OccupationsResolver } from './occupations.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([Occupation])],
  providers: [OccupationsService, OccupationsResolver],
})
export class OccupationsModule {}
