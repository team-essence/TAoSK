import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user';
import { NewUserInput } from './dto/newUser.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepostiory: Repository<User>,
  ) {}

  getAllUsers(): Promise<User[]> {
    const users = this.usersRepostiory.find();
    if (!users) throw new NotFoundException();

    return users;
  }

  getUser(id: string): Promise<User> {
    const user = this.usersRepostiory.findOne(id);
    if (!user) throw new NotFoundException();

    return user;
  }

  async create(data: NewUserInput): Promise<User> {
    const user = this.usersRepostiory.create(data);
    await this.usersRepostiory.save(user).catch((err) => {
      new InternalServerErrorException();
    });

    return user;
  }

  // async remove(uid: string): Promise<boolean> {
  //   const result = await this.usersRepostiory.delete(uid);
  //   return result.affected > 0;
  // }
}
