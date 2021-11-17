import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Group } from './group';
import { GroupsService } from './groups.service';

@Resolver()
export class GroupsResolver {
  constructor(private groupService: GroupsService) {}

  @Mutation(() => Group)
  async joinProject(
    @Args({ name: 'invitationId' }) invitationId: string,
    @Args({ name: 'userId' }) userId: string,
    @Args({ name: 'projectId' }) projectId: string,
  ) {
    const group = await this.groupService.joinProject(
      invitationId,
      userId,
      projectId,
    );

    if (!group) throw new NotFoundException();

    return group;
  }
}
