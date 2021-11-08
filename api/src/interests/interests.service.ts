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
    private interestsRepostiory: Repository<Interest>,
  ) {}

  getInterestsByIds(user_ids: [string]): Promise<Interest[]> {
    const interests = this.interestsRepostiory.find({
      user_id: In(user_ids),
    });
    if (!interests) throw new NotFoundException();

    return interests;
  }

  async create(data: NewInterestInput): Promise<Interest> {
    const interest = this.interestsRepostiory.create(data);
    await this.interestsRepostiory.save(interest).catch((err) => {
      new InternalServerErrorException();
    });

    return interest;
  }
}
