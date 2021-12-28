import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Invitation } from './invitation';
import { InvitationsService } from './invitations.service';

@Resolver()
export class InvitationsResolver {
  private pubSub: PubSub;
  constructor(private invitationService: InvitationsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => Invitation)
  public async invitation(
    @Args({ name: 'userId' }) userId: string,
    @Args({ name: 'projectId' }) projectId: string,
  ) {
    const invitation = await this.invitationService.findOne(userId, projectId);

    if (!invitation) throw new NotFoundException({ userId, projectId });

    return invitation;
  }

  @Query(() => [Invitation])
  public async invitations(@Args({ name: 'userId' }) userId: string) {
    const invitations = await this.invitationService.find(userId);
    if (!invitations) throw new NotFoundException(userId);
    return invitations;
  }

  @Mutation(() => Invitation)
  public async createInvitation(
    @Args({ name: 'userId' }) userId: string,
    @Args({ name: 'projectId' }) projectId: string,
  ) {
    const result = await this.invitationService.create(userId, projectId);

    if (!result.invitation) throw new NotFoundException({ userId, projectId });

    this.pubSub.publish('newInvitation', {
      newInvitation: {
        userId,
        invitations: result.invitations,
      },
    });

    return result.invitation;
  }

  @Subscription((returns) => [Invitation], {
    filter: (payload, variables) => {
      return payload.newInvitation.userId === variables.userId;
    },
    resolve: (value) => {
      return value.newInvitation.invitations;
    },
  })
  newInvitation(@Args({ name: 'userId', type: () => String }) userId: string) {
    return this.pubSub.asyncIterator('newInvitation');
  }
}
