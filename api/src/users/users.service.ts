import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user';
import { NewUserInput } from './dto/newUser.input';
import { Brackets, In, Like, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewCertificationClientInput } from 'src/certifications/dto/newCertification.input';
import { NewInterestClientInput } from 'src/interests/dto/newInterest.input';
import { Interest } from 'src/interests/interest';
import { Certification } from 'src/certifications/certification';
import { SearchUserInput } from './dto/searchUser.input';
import { ProjectDetailUserSearchInput } from './dto/projectDetailUserSearchInput';
import { Project } from 'src/projects/project';
import { GameLog } from 'src/game-logs/game-log';
import { Occupation } from 'src/occupations/occupation';
import { updateUserStatus } from './dto/updateUserStatus.input';
import { Group } from 'src/groups/group';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(GameLog)
    private gameLogRepository: Repository<GameLog>,
    @InjectRepository(Occupation)
    private occupationRepository: Repository<Occupation>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  getAllUsers(): Promise<User[]> {
    const users = this.usersRepository.find({
      relations: ['interests', 'certifications'],
    });
    if (!users) throw new NotFoundException();

    return users;
  }

  getUser(id: string): Promise<User> {
    const user = this.usersRepository.findOne(id, {
      relations: [
        'interests',
        'certifications',
        'invitations',
        'invitations.project',
        'groups',
        'groups.project',
        'groups.project.tasks',
        'groups.project.groups',
        'groups.project.groups.user',
        'groups.project.groups.user.occupation',
        'groups.project.monster',
        'groups.project.monster.specie',
        'occupation',
      ],
    });
    if (!user) throw new NotFoundException();

    return user;
  }

  getHrAllUsers(company: string): Promise<User[]> {
    const users = this.usersRepository.find({
      relations: [
        'interests',
        'certifications',
        'invitations',
        'invitations.project',
        'groups',
        'groups.project',
        'allocations',
        'allocations.task',
        'occupation',
      ],
      where: {
        company: company,
      },
    });
    if (!users) throw new NotFoundException();

    return users;
  }

  async create({
    newUser,
    newInterest,
    newCertification,
  }: {
    newUser: NewUserInput;
    newInterest: NewInterestClientInput;
    newCertification: NewCertificationClientInput;
  }): Promise<User> {
    console.log(newUser);

    const occupation = await this.occupationRepository.findOne(
      newUser.occupation_id,
    );
    console.log(occupation.name);

    if (!occupation) throw new NotFoundException();

    const user = this.usersRepository.create({
      id: newUser.id,
      name: newUser.name,
      icon_image: newUser.icon_image,
      online_flg: newUser.online_flg,
      hp: newUser.hp,
      mp: newUser.mp,
      company: newUser.company,
      memo: newUser.memo,
      occupation,
      technology: newUser.technology,
      achievement: newUser.achievement,
      motivation: newUser.motivation,
      solution: newUser.solution,
      plan: newUser.plan,
      design: newUser.design,
      exp: newUser.exp,
    });
    await this.usersRepository.save(user).catch((err) => {
      new InternalServerErrorException();
    });

    for (
      let interest_index = 0;
      interest_index < newInterest.context.length;
      interest_index++
    ) {
      const newInterestData = this.interestRepository.create({
        context: newInterest.context[interest_index],
        user,
      });
      await this.interestRepository.save(newInterestData);
    }

    for (
      let certification_index = 0;
      certification_index < newCertification.name.length;
      certification_index++
    ) {
      const newCertificationData = this.certificationRepository.create({
        name: newCertification.name[certification_index],
        user,
      });
      await this.certificationRepository.save(newCertificationData);
    }

    return user;
  }

  searchSameCompanyUsers({
    conditionSearchUser,
  }: {
    conditionSearchUser: SearchUserInput;
  }): Promise<User[]> {
    const sameCompanyUsers = this.usersRepository.find({
      where: {
        id: Not(In(conditionSearchUser.ids)),
        company: conditionSearchUser.company,
        name: Like(`%${conditionSearchUser.name}%`),
      },
      relations: ['occupation'],
    });
    if (!sameCompanyUsers) throw new NotFoundException();

    return sameCompanyUsers;
  }

  projectDetailSearchSameCompanyUsers({
    projectDetailSearchSameCompanyUsers,
  }: {
    projectDetailSearchSameCompanyUsers: ProjectDetailUserSearchInput;
  }): Promise<User[]> {
    const projectDetailSearchSameUsers = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.groups', 'groups')
      .leftJoinAndSelect(
        'user.invitations',
        'invitations',
        'invitations.project_id = :projectId',
        {
          projectId: projectDetailSearchSameCompanyUsers.project_id,
        },
      )
      .leftJoinAndSelect('invitations.project', 'project')
      .andWhere('user.company = :company', {
        company: projectDetailSearchSameCompanyUsers.company,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('user.name LIKE :name', {
            name: `%${projectDetailSearchSameCompanyUsers.input}%`,
          }).orWhere('user.id LIKE :id', {
            id: `%${projectDetailSearchSameCompanyUsers.input}%`,
          });
        }),
      )
      .getMany();

    if (!projectDetailSearchSameUsers) throw new NotFoundException();

    return projectDetailSearchSameUsers;
  }

  async updateOnlineFlag(id: string, project_id: string, isOnline: boolean) {
    const user = await this.usersRepository.findOne(id);

    if (!user) throw new NotFoundException();

    user.online_flg = isOnline;
    await this.usersRepository.save(user).catch((err) => {
      new InternalServerErrorException();
    });

    const project = await this.projectRepository.findOne(project_id);
    if (!project) throw new NotFoundException();

    const log = this.gameLogRepository.create({
      context: isOnline ? 'オンライン' : 'オフライン',
      user,
      project,
    });
    await this.gameLogRepository.save(log).catch((err) => {
      throw err;
    });

    const logs = await this.gameLogRepository.find({
      where: {
        project: {
          id: project_id,
        },
      },
      order: {
        id: 'DESC',
      },
      take: 25,
      relations: ['user', 'project'],
    });

    const groups = await this.groupRepository.find({
      where: {
        project: {
          id: project_id,
        },
      },
      relations: [
        'user',
        'user.interests',
        'user.certifications',
        'user.occupation',
      ],
    });

    return { user, logs, groups };
  }

  async updateMemo(id: string, memo: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) throw new NotFoundException();

    user.memo = memo;
    await this.usersRepository.save(user).catch((err) => {
      new InternalServerErrorException();
    });

    return user;
  }

  async updateHpAndMp(status: updateUserStatus) {
    const user = await this.usersRepository.findOne(status.id);

    if (!user) throw new NotFoundException();

    user.hp = parseInt(status.hp);
    user.mp = parseInt(status.mp);
    await this.usersRepository.save(user).catch((err) => {
      new InternalServerErrorException();
    });

    return user;
  }

  async updateUserName(id: string, name: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) throw new NotFoundException();

    user.name = name;
    await this.usersRepository.save(user).catch((err) => {
      new InternalServerErrorException();
    });

    return user;
  }

  async updateUserIconImage(id: string, icon_image: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) throw new NotFoundException();

    user.icon_image = icon_image;
    await this.usersRepository.save(user).catch((err) => {
      new InternalServerErrorException();
    });

    return user;
  }

  // async remove(uid: string): Promise<boolean> {
  //   const result = await this.usersRepository.delete(uid);
  //   return result.affected > 0;
  // }
}
