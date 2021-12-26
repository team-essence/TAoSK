import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Group } from './group';
import { GroupsService } from './groups.service';

@Resolver()
export class GroupsResolver {
  private pubSub: PubSub;
  constructor(private groupService: GroupsService) {
    this.pubSub = new PubSub();
  }

  @Mutation(() => Group)
  async joinProject(
    @Args({ name: 'invitationId' }) invitationId: string,
    @Args({ name: 'userId' }) userId: string,
    @Args({ name: 'projectId' }) projectId: string,
  ) {
    const result = await this.groupService.joinProject(
      invitationId,
      userId,
      projectId,
    );
    if (!result.group) throw new NotFoundException();

    this.pubSub.publish('updateGroupsByGroup', {
      updateGroupsByGroup: {
        projectId,
        groups: result.groups,
      },
    });

    return result.group;
  }

  @Subscription((returns) => [Group], {
    filter: (payload, variables) => {
      return payload.updateGroupsByGroup.projectId === variables.projectId;
    },
    resolve: (values) => {
      return values.updateGroupsByGroup.groups;
    },
  })
  updateGroupsByGroup(
    @Args({ name: 'projectId', type: () => String }) projectId: string,
  ) {
    return this.pubSub.asyncIterator('updateGroupsByGroup');
  }
}
