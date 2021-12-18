import { Module } from '@nestjs/common';
import { CertificationsResolver } from './certifications.resolver';
import { CertificationsService } from './certifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certification } from './certification';
import { User } from 'src/users/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certification]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [CertificationsResolver, CertificationsService],
  exports: [CertificationsService],
})
export class CertificationsModule {}
