import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user';
import { NewUserInput } from './dto/newUser.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewQualificationClientInput } from 'src/qualifications/dto/newQualification.input';
import { NewInterestClientInput } from 'src/interests/dto/newInterest.input';
import { Interest } from 'src/interests/interest';
import { Qualification } from 'src/qualifications/qualification';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
    @InjectRepository(Qualification)
    private qualificationRepository: Repository<Qualification>,
  ) {}

  getAllUsers(): Promise<User[]> {
    const users = this.usersRepository.find({
      relations: ['interest', 'qualifications'],
    });
    if (!users) throw new NotFoundException();

    return users;
  }

  getUser(id: string): Promise<User> {
    const user = this.usersRepository.findOne(id, {
      relations: ['interest', 'qualifications'],
    });
    if (!user) throw new NotFoundException();

    return user;
  }

  async create({
    newUser,
    newInterest,
    newQualification,
  }: {
    newUser: NewUserInput;
    newInterest: NewInterestClientInput;
    newQualification: NewQualificationClientInput;
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
      let qualification_index = 0;
      qualification_index < newQualification.name.length;
      qualification_index++
    ) {
      const newQualificationData = this.qualificationRepository.create({
        name: newQualification.name[qualification_index],
        user,
      });
      await this.qualificationRepository.save(newQualificationData);
    }

    return user;
  }

  // async remove(uid: string): Promise<boolean> {
  //   const result = await this.usersRepository.delete(uid);
  //   return result.affected > 0;
  // }
}
