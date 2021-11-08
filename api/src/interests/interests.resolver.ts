import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Interest } from './interest';
import { InterestsService } from './interests.service';
import { NewInterestInput } from './dto/newInterest.input';

@Resolver(() => Interest)
export class InterestsResolver {
  constructor(private interestsService: InterestsService) {}

  @Query(() => [Interest])
  public async getInterests(
    @Args({ name: 'user_ids', type: () => [String] }) user_ids: [string],
  ) {
    const interests = await this.interestsService.getInterestsByIds(user_ids);
    if (!interests) {
      throw new NotFoundException(user_ids);
    }
    return interests;
  }

  @Mutation(() => Interest)
  public async addInterest(
    @Args('newInterest') newInterest: NewInterestInput,
  ): Promise<Interest> {
    return this.interestsService.create(newInterest).catch((err) => {
      throw err;
    });
  }
}
