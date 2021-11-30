import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesService, CompaniesResolver],
  exports: [CompaniesService],
})
export class CompaniesModule {}
