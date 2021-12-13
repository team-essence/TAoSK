import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Occupation } from './occupation';

@Injectable()
export class OccupationsService {
  constructor(
    @InjectRepository(Occupation)
    private occupationRepository: Repository<Occupation>,
  ) {}

  async create(name: string): Promise<Occupation> {
    const occupation = this.occupationRepository.create({ name });
    await this.occupationRepository.save(occupation).catch((err) => {
      new InternalServerErrorException();
    });

    return occupation;
  }

  async find(): Promise<Occupation[]> {
    const occupations = await this.occupationRepository.find();

    if (!occupations) throw new NotFoundException();

    return occupations;
  }
}
