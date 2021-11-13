import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Occupation } from './occupation';
@Module({
  imports: [TypeOrmModule.forFeature([Occupation])],
})
export class OccupationsModule {}
