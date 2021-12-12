import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Occupation } from './occupation';
import { OccupationsService } from './occupations.service';

@Resolver()
export class OccupationsResolver {
  constructor(private occupationService: OccupationsService) {}

  @Query(() => [Occupation])
  async getOccupations() {
    return await this.occupationService.find().catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Occupation)
  async creteOccupation(@Args({ name: 'name' }) name: string) {
    return await this.occupationService.create(name).catch((err) => {
      throw err;
    });
  }
}
