import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company';
@Module({
  imports: [TypeOrmModule.forFeature([Company])],
})
export class CompaniesModule {}
