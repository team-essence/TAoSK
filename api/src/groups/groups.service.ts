import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from 'src/invitations/invitation';
import { Project } from 'src/projects/project';
import { User } from 'src/users/user';
import { Repository } from 'typeorm';
import { Group } from './group';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
  ) {}

  async joinProject(
    invitationId: string,
    userId: string,
    projectId: string,
  ): Promise<{
    group: Group;
    groups: Group[];
  }> {
    // 招待テーブル
    const invitation = await this.invitationRepository.findOne(invitationId);
    invitation.deleted_at = new Date();
    this.invitationRepository.save(invitation);

    // グループテーブル
    const user = await this.userRepository.findOne(userId);
    const project = await this.projectRepository.findOne(projectId);
    const group = this.groupRepository.create({
      user,
      project,
      authority_flg: true,
    });

    await this.groupRepository.save(group).catch((err) => {
      new InternalServerErrorException();
    });

    const groups = await this.groupRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
      relations: [
        'user',
        'user.interests',
        'user.certifications',
        'user.occupation',
      ],
    });

    return {
      group,
      groups,
    };
  }
}
