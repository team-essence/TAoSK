import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Interest } from './interest';
import { NewInterestInput } from './dto/newInterest.input';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private interestsRepository: Repository<Interest>,
  ) {}

  findAll(): Promise<Interest[]> {
    const interests = this.interestsRepository.find();
    if (!interests) throw new NotFoundException();

    return interests;
  }

  getInterestsByUserIds(user_ids: [string]): Promise<Interest[]> {
    const interests = this.interestsRepository.find({
      where: {
        user: In(user_ids),
      },
      relations: ['user'],
    });
    if (!interests) throw new NotFoundException();

    return interests;
  }

  async create(data: NewInterestInput): Promise<Interest> {
    const interest = this.interestsRepository.create(data);
    await this.interestsRepository.save(interest).catch((err) => {
      new InternalServerErrorException();
    });

    return interest;
  }
}
