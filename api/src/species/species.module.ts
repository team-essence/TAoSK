import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './specie';
import { Monster } from 'src/monsters/monster';
@Module({
  imports: [
    TypeOrmModule.forFeature([Specie]),
    TypeOrmModule.forFeature([Monster]),
  ],
})
export class SpeciesModule {}
