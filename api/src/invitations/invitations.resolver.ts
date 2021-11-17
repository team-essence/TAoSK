import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Invitation } from './invitation';
import { InvitationsService } from './invitations.service';

@Resolver()
export class InvitationsResolver {
  constructor(private invitationService: InvitationsService) {}

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
    const invitation = await this.invitationService.create(userId, projectId);

    if (!invitation) throw new NotFoundException({ userId, projectId });

    return invitation;
  }
}
