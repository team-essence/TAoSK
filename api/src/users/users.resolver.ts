import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { User } from './user';
import { UsersService } from './users.service';
import { NewUserInput } from './dto/newUser.input';
import { NewInterestClientInput } from 'src/interests/dto/newInterest.input';
import { NewCertificationClientInput } from 'src/certifications/dto/newCertification.input';
import { PubSub } from 'graphql-subscriptions';
import { SearchUserInput } from './dto/searchUser.input';
import { ProjectDetailUserSearchInput } from './dto/projectDetailUserSearchInput';

@Resolver((of) => User)
export class UsersResolver {
  private pubSub: PubSub;
  constructor(private usersService: UsersService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [User])
  public async allUsers(): Promise<User[]> {
    return this.usersService.getAllUsers().catch((err) => {
      throw err;
    });
  }

  @Query(() => User)
  async user(@Args({ name: 'id' }) id: string) {
    const user = await this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => [User])
  public async findHrUsers(
    @Args({ name: 'company' }) company: string,
  ): Promise<User[]> {
    return this.usersService.getHrAllUsers(company).catch((err) => {
      throw err;
    });
  }

  @Query(() => [User])
  public async findProjectDetailSameCompanyUsers(
    @Args({ name: 'searchUser' }) searchUser: ProjectDetailUserSearchInput,
  ): Promise<User[]> {
    return this.usersService
      .projectDetailSearchSameCompanyUsers({
        projectDetailSearchSameCompanyUsers: searchUser,
      })
      .catch((err) => {
        throw err;
      });
  }

  @Mutation(() => User)
  public async addUser(
    @Args('newUser') newUser: NewUserInput,
    @Args('newInterest') newInterest: NewInterestClientInput,
    @Args('newCertification') newCertification: NewCertificationClientInput,
  ): Promise<User> {
    const user = await this.usersService
      .create({ newUser, newInterest, newCertification })
      .catch((err) => {
        throw err;
      });

    this.pubSub.publish('userAdded', { userAdded: user });
    return user;
  }

  @Mutation(() => [User])
  public async searchSameCompanyUsers(
    @Args({ name: 'conditionSearchUser' }) conditionSearchUser: SearchUserInput,
  ) {
    const sameCompanyUsers = await this.usersService.searchSameCompanyUsers({
      conditionSearchUser,
    });
    if (!sameCompanyUsers) throw new NotFoundException(conditionSearchUser);

    return sameCompanyUsers;
  }

  @Mutation(() => User)
  public async updateOnlineFlag(
    @Args({ name: 'id' }) id: string,
    @Args({ name: 'isOnline' }) isOnline: boolean,
  ) {
    const user = await this.usersService.updateOnlineFlag(id, isOnline);
    if (!user) throw new NotFoundException({ id, isOnline });

    return user;
  }

  @Mutation(() => User)
  public async updateMemo(
    @Args({ name: 'id' }) id: string,
    @Args({ name: 'memo' }) memo: string,
  ) {
    const user = await this.usersService.updateMemo(id, memo);
    if (!user) throw new NotFoundException({ id, memo });

    return user;
  }

  @Subscription((returns) => User, {})
  userAdded() {
    return this.pubSub.asyncIterator('userAdded');
  }

  // @Mutation((returns) => Boolean)
  // async removeUser(@Args({ name: 'id', type: () => Int }) uid: string) {
  //   return this.usersService.remove(uid);
  // }
}
