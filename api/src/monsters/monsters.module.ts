import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monster } from './monster';
@Module({
  imports: [TypeOrmModule.forFeature([Monster])],
})
export class MonstersModule {}
