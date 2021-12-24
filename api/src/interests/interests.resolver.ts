import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Interest } from './interest';
import { InterestsService } from './interests.service';
import { NewInterestInput } from './dto/newInterest.input';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/users/user';

@Resolver(() => Interest)
export class InterestsResolver {
  private pubSub: PubSub;
  constructor(private interestsService: InterestsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [Interest])
  public async allInterests() {
    return this.interestsService.findAll().catch((err) => {
      throw err;
    });
  }

  @Query(() => [Interest])
  public async interestsByUserIds(
    @Args({ name: 'user_ids', type: () => [String] }) user_ids: [string],
  ) {
    const interests = await this.interestsService.getInterestsByUserIds(
      user_ids,
    );
    if (!interests) {
      throw new NotFoundException(user_ids);
    }
    return interests;
  }

  @Mutation(() => Interest)
  public async addInterest(
    @Args('newInterest') newInterest: NewInterestInput,
  ): Promise<Interest> {
    const result = await this.interestsService
      .create(newInterest)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateUserDataByInterest', {
      updateUserDataByInterest: {
        user: result.user,
        userId: newInterest.user_id,
      },
    });

    return result.interest;
  }

  @Mutation(() => [Interest])
  public async updateInterests(
    @Args('user_id') user_id: string,
    @Args({ name: 'contexts', type: () => [String] }) contexts: [string],
  ): Promise<Interest[]> {
    const result = await this.interestsService
      .update(user_id, contexts)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateUserDataByInterest', {
      updateUserDataByInterest: {
        user: result.user,
        userId: user_id,
      },
    });

    return result.interests;
  }

  @Subscription((returns) => User, {
    filter: (payload, variables) => {
      return payload.updateUserDataByInterest.userId === variables.userId;
    },
    resolve: (values) => {
      return values.updateUserDataByInterest.user;
    },
  })
  updateUserDataByInterest(
    @Args({ name: 'userId', type: () => String }) userId: string,
  ) {
    return this.pubSub.asyncIterator('updateUserDataByInterest');
  }
}
