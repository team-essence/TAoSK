import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user';
import { UsersService } from './users.service';
import { NewUserInput } from './dto/newUser.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  public async allUsers(): Promise<User[]> {
    return this.usersService.getAllUsers().catch((err) => {
      throw err;
    });
  }

  // @Query((returns) => User)
  // async getUser(@Args({ name: 'id', type: () => Int }) uid: string) {
  //   const user = await this.usersService.findOneById(uid);
  //   if (!user) {
  //     throw new NotFoundException(uid);
  //   }
  //   return user;
  // }

  @Mutation(() => User)
  public async addUser(@Args('newUser') newUser: NewUserInput): Promise<User> {
    return this.usersService.create(newUser).catch((err) => {
      throw err;
    });
  }

  // @Mutation((returns) => Boolean)
  // async removeUser(@Args({ name: 'id', type: () => Int }) uid: string) {
  //   return this.usersService.remove(uid);
  // }
}
