import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Invitation } from 'src/invitations/invitation';
import { User } from 'src/users/user';
import { EndProjectInput } from './dto/endProject.input';
import { NewProjectInput, SelectUser } from './dto/newProject.input';
import { Project } from './project';
import { ProjectsService } from './projects.service';

@Resolver()
export class ProjectsResolver {
  private pubSub: PubSub;
  constructor(private projectService: ProjectsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => Project)
  async getProjectById(@Args({ name: 'id' }) id: string) {
    const project = await this.projectService.findProjectOne(id);

    if (!project) throw new NotFoundException();

    return project;
  }

  @Mutation(() => Project)
  async createProject(
    @Args({ name: 'newProject' }) newProject: NewProjectInput,
    @Args({ name: 'selectUser' }) selectUser: SelectUser,
  ) {
    const newProjectData = await this.projectService
      .create({
        newProject,
        selectUser,
      })
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('projectCreate', {
      projectCreate: {
        user: newProjectData.currentUser,
        userId: newProjectData.currentUser.id,
      },
    });

    for (let index = 0; index < newProjectData.invitations.length; index++) {
      this.pubSub.publish('newInvitationByCreateProject', {
        newInvitationByCreateProject: newProjectData.invitations[index],
      });
    }

    return newProjectData.project;
  }

  @Mutation(() => Project)
  async completeProject(
    @Args({ name: 'endProject' }) endProject: EndProjectInput,
  ) {
    return this.projectService.completeProject(endProject).catch((err) => {
      throw err;
    });
  }

  @Subscription((returns) => User, {
    filter: (payload, variables) => {
      return payload.projectCreate.userId === variables.userId;
    },
    resolve: (values) => {
      return values.projectCreate.user;
    },
  })
  projectCreate(@Args({ name: 'userId', type: () => String }) userId: string) {
    return this.pubSub.asyncIterator('projectCreate');
  }

  @Subscription((returns) => [Invitation], {
    filter: (payload, variables) => {
      return payload.newInvitationByCreateProject.userId === variables.userId;
    },
    resolve: (value) => {
      return value.newInvitationByCreateProject.invitations;
    },
  })
  newInvitationByCreateProject(
    @Args({ name: 'userId', type: () => String }) userId: string,
  ) {
    return this.pubSub.asyncIterator('newInvitationByCreateProject');
  }
}
