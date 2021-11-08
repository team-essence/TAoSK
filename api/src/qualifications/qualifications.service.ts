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
    private qualificationsRepostiory: Repository<Qualification>,
  ) {}

  getQualificationsByIds(user_ids: [string]): Promise<Qualification[]> {
    const qualifications = this.qualificationsRepostiory.find({
      user_id: In(user_ids),
    });
    if (!qualifications) throw new NotFoundException();

    return qualifications;
  }

  async create(data: NewQualificationInput): Promise<Qualification> {
    const user = this.qualificationsRepostiory.create(data);
    await this.qualificationsRepostiory.save(user).catch((err) => {
      new InternalServerErrorException();
    });

    return user;
  }
}
