import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './specie';
@Module({
  imports: [TypeOrmModule.forFeature([Specie])],
})
export class SpeciesModule {}
