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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
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
        'groups.project.groups',
        'groups.project.groups.user',
        'groups.project.monster',
        'groups.project.monster.specie',
      ],
    });
    if (!user) throw new NotFoundException();

    return user;
  }

  getHrAllUsers(company: string): Promise<User[]> {
    const users = this.usersRepository.find({
      relations: ['interests', 'certifications'],
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
    const user = this.usersRepository.create(newUser);
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
      id: Not(In(conditionSearchUser.ids)),
      company: conditionSearchUser.company,
      name: Like(`%${conditionSearchUser.name}%`),
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
      .where('groups.id IS NULL')
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

  async updateOnlineFlag(id: string, isOnline: boolean) {
    const user = await this.usersRepository.findOne(id);

    if (!user) throw new NotFoundException();

    user.online_flg = isOnline;
    await this.usersRepository.save(user).catch((err) => {
      new InternalServerErrorException();
    });

    return user;
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

  // async remove(uid: string): Promise<boolean> {
  //   const result = await this.usersRepository.delete(uid);
  //   return result.affected > 0;
  // }
}
