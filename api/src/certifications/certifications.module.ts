import { Module } from '@nestjs/common';
import { CertificationsResolver } from './certifications.resolver';
import { CertificationsService } from './certifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certification } from './certification';

@Module({
  imports: [TypeOrmModule.forFeature([Certification])],
  providers: [CertificationsResolver, CertificationsService],
  exports: [CertificationsService],
})
export class CertificationsModule {}
