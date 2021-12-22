import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/user';
import { EndProjectInput } from './dto/endProject.input';
import { NewProjectInput, SelectUser } from './dto/newProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';
import { Project } from './project';
import { ProjectsService } from './projects.service';

@Resolver()
export class ProjectsResolver {
  constructor(private projectService: ProjectsService) {}

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

    return newProjectData;
  }

  @Mutation(() => Boolean)
  async completedProject(
    @Args({ name: 'endProject' }) endProject: EndProjectInput,
  ) {
    return this.projectService.completedProject(endProject);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args({ name: 'projectId' }) projectId: string,
    @Args({ name: 'updateProject' }) updateProject: UpdateProjectInput,
  ) {
    return this.projectService.updateProject(projectId, updateProject);
  }

  @Mutation(() => User)
  async deleteProject(
    @Args({ name: 'projectId' }) projectId: string,
    @Args({ name: 'userId' }) userId: string,
  ) {
    return this.projectService.deleteProject(projectId, userId);
  }
}
