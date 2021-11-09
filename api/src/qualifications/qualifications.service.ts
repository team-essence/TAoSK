import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Qualification } from './qualification';
import { NewQualificationInput } from './dto/newQualification.input';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QualificationsService {
  constructor(
    @InjectRepository(Qualification)
    private qualificationsRepository: Repository<Qualification>,
  ) {}

  getQualificationsByIds(user_ids: [string]): Promise<Qualification[]> {
    const qualifications = this.qualificationsRepository.find({
      where: {
        user: In(user_ids),
      },
      relations: ['user'],
    });
    if (!qualifications) throw new NotFoundException();

    return qualifications;
  }

  async create(data: NewQualificationInput): Promise<Qualification> {
    const qualification = this.qualificationsRepository.create(data);
    await this.qualificationsRepository.save(qualification).catch((err) => {
      new InternalServerErrorException();
    });

    return qualification;
  }
}
