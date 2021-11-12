import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monster } from './monster';
import { Project } from 'src/projects/project';
@Module({
  imports: [
    TypeOrmModule.forFeature([Monster]),
    TypeOrmModule.forFeature([Project]),
  ],
})
export class MonstersModule {}
