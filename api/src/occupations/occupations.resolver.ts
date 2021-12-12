import { Resolver } from '@nestjs/graphql';
import { OccupationsService } from './occupations.service';

@Resolver()
export class OccupationsResolver {
  constructor(private occupationService: OccupationsService) {}

  async getFindAll() {
    return await this.occupationService.find().catch((err) => {
      throw err;
    });
  }
}
