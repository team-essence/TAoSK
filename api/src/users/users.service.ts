import { Injectable } from '@nestjs/common';
import { User, GenderType } from './user';
import { NewUserInput } from './newUser.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepostiory: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepostiory.find();
  }

  findOneById(uid: string): Promise<User> {
    return this.usersRepostiory.findOne(uid);
  }

  async create(data: NewUserInput): Promise<User> {
    const user = this.usersRepostiory.create(data);
    await this.usersRepostiory.save(user);
    return user;
  }

  async remove(uid: string): Promise<boolean> {
    const result = await this.usersRepostiory.delete(uid);
    return result.affected > 0;
  }
}
