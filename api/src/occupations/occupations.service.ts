import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Occupation } from './occupation';

@Injectable()
export class OccupationsService {
  constructor(
    @InjectRepository(Occupation)
    private occupationRepository: Repository<Occupation>,
  ) {}

  async find(): Promise<Occupation[]> {
    const occupations = await this.occupationRepository.find();

    if (!occupations) throw new NotFoundException();

    return occupations;
  }
}
