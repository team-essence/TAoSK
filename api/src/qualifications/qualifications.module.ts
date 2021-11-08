import { Module } from '@nestjs/common';
import { QualificationsResolver } from './qualifications.resolver';
import { QualificationsService } from './qualifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qualification } from './qualification';

@Module({
  imports: [TypeOrmModule.forFeature([Qualification])],
  providers: [QualificationsResolver, QualificationsService],
  exports: [QualificationsService],
})
export class QualificationsModule {}
