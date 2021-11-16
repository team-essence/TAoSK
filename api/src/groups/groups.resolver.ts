import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Group } from './group';
import { GroupsService } from './groups.service';

@Resolver()
export class GroupsResolver {
  constructor(private groupService: GroupsService) {}
}
