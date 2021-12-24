import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/project';
import { User } from 'src/users/user';
import { IsNull, Repository } from 'typeorm';
import { Invitation } from './invitation';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  find(userId: string): Promise<Invitation[]> {
    const invitation = this.invitationRepository.find({
      relations: ['project'],
      where: {
        user: {
          id: userId,
        },
        deleted_at: IsNull(),
      },
    });

    if (!invitation) throw new NotFoundException();

    return invitation;
  }

  findOne(userId: string, projectId: string): Promise<Invitation> {
    const invitation = this.invitationRepository.findOne({
      relations: ['project', 'user'],
      where: {
        user: {
          id: userId,
        },
        project: {
          id: projectId,
        },
        deleted_at: IsNull(),
      },
    });

    if (!invitation) throw new NotFoundException();
    return invitation;
  }

  async create(
    userId: string,
    projectId: string,
  ): Promise<{
    invitation: Invitation;
    invitations: Invitation[];
  }> {
    const user = await this.userRepository.findOne(userId);
    const project = await this.projectRepository.findOne(projectId);
    const invitation = this.invitationRepository.create({
      user,
      project,
    });

    await this.invitationRepository.save(invitation).catch((err) => {
      new InternalServerErrorException();
    });

    const invitations = await this.invitationRepository.find({
      where: {
        user: userId,
      },
      relations: ['user', 'project'],
    });

    return { invitation, invitations };
  }
}
