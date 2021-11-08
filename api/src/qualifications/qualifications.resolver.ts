import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Qualification } from './qualification';
import { QualificationsService } from './qualifications.service';
import { NewQualificationInput } from './dto/newQualification.input';

@Resolver(() => Qualification)
export class QualificationsResolver {
  constructor(private qualificationService: QualificationsService) {}

  @Query(() => [Qualification])
  public async getQualifications(
    @Args({ name: 'user_ids', type: () => [String] }) user_ids: [string],
  ) {
    const qualifications =
      await this.qualificationService.getQualificationsByIds(user_ids);
    if (!qualifications) {
      throw new NotFoundException(user_ids);
    }
    return qualifications;
  }

  @Mutation(() => Qualification)
  public async addQualification(
    @Args('newQualification') newQualification: NewQualificationInput,
  ): Promise<Qualification> {
    return this.qualificationService.create(newQualification).catch((err) => {
      throw err;
    });
  }
}
