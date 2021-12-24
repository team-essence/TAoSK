import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/users/user';
import { Certification } from './certification';
import { CertificationsService } from './certifications.service';
import { NewCertificationInput } from './dto/newCertification.input';

@Resolver(() => Certification)
export class CertificationsResolver {
  private pubSub: PubSub;
  constructor(private certificationService: CertificationsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [Certification])
  public async certifications(
    @Args({ name: 'user_ids', type: () => [String] }) user_ids: [string],
  ) {
    const certifications =
      await this.certificationService.getCertificationsByIds(user_ids);
    if (!certifications) {
      throw new NotFoundException(user_ids);
    }
    return certifications;
  }

  @Mutation(() => Certification)
  public async addCertification(
    @Args('newCertification') newCertification: NewCertificationInput,
  ): Promise<Certification> {
    const result = await this.certificationService
      .create(newCertification)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateUserDataByCertification', {
      updateUserDataByCertification: {
        userId: newCertification.user_id,
        user: result.user,
      },
    });

    return result.certification;
  }

  @Mutation(() => [Certification])
  public async updateCertifications(
    @Args('user_id') user_id: string,
    @Args({ name: 'names', type: () => [String] }) names: [string],
  ): Promise<Certification[]> {
    const result = await this.certificationService
      .update(user_id, names)
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('updateUserDataByCertification', {
      updateUserDataByCertification: {
        userId: user_id,
        user: result.user,
      },
    });

    return result.certifications;
  }

  @Subscription((returns) => User, {
    filter: (payload, variables) => {
      return payload.updateUserDataByCertification.userId === variables.userId;
    },
    resolve: (values) => {
      return values.updateUserDataByCertification.user;
    },
  })
  updateUserDataByCertification(
    @Args({ name: 'userId', type: () => String }) userId: string,
  ) {
    return this.pubSub.asyncIterator('updateUserDataByCertification');
  }
}
