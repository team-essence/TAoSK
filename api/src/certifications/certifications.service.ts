import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Certification } from './certification';
import { NewCertificationInput } from './dto/newCertification.input';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certification)
    private CertificationsRepository: Repository<Certification>,
  ) {}

  getCertificationsByIds(user_ids: [string]): Promise<Certification[]> {
    const certifications = this.CertificationsRepository.find({
      where: {
        user: In(user_ids),
      },
      relations: ['user'],
    });
    if (!certifications) throw new NotFoundException();

    return certifications;
  }

  async create(data: NewCertificationInput): Promise<Certification> {
    const certification = this.CertificationsRepository.create(data);
    await this.CertificationsRepository.save(certification).catch((err) => {
      new InternalServerErrorException();
    });

    return certification;
  }
}
