import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NewProjectInput, SelectUser } from './dto/newProject.input';
import { Project } from './project';
import { ProjectsService } from './projects.service';

@Resolver()
export class ProjectsResolver {
  constructor(private projectService: ProjectsService) {}

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

  @Mutation(() => Project)
  async getProjectById(@Args({ name: 'id' }) id: number) {
    const project = await this.projectService.findProjectOne(id);

    if (!project) throw new NotFoundException();

    return project;
  }
}
