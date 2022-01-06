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
import { GameLog } from 'src/game-logs/game-log';
import { Group } from 'src/groups/group';

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
    @Args({ name: 'project_id' }) project_id: string,
    @Args({ name: 'isOnline' }) isOnline: boolean,
  ) {
    const result = await this.usersService.updateOnlineFlag(
      id,
      project_id,
      isOnline,
    );
    if (!result) throw new NotFoundException({ id, isOnline });

    this.pubSub.publish('updateLogsByOnline', {
      updateLogsByOnline: {
        gameLogs: result.logs,
        projectId: project_id,
      },
    });

    this.pubSub.publish('updateGroupsByOnline', {
      updateGroupsByOnline: { groups: result.groups, projectId: project_id },
    });

    return result.user;
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

  @Mutation(() => User)
  public async updateUserName(
    @Args({ name: 'id' }) id: string,
    @Args({ name: 'name' }) name: string,
  ) {
    const user = await this.usersService.updateUserName(id, name);
    if (!user) throw new NotFoundException({ id, name });

    this.pubSub.publish('updateUserData', {
      updateUserData: {
        user,
        userId: id,
      },
    });

    return user;
  }

  @Mutation(() => User)
  public async updateUserIconImage(
    @Args({ name: 'id' }) id: string,
    @Args({ name: 'icon_image' }) icon_image: string,
  ) {
    const user = await this.usersService.updateUserIconImage(id, icon_image);
    if (!user) throw new NotFoundException({ id, icon_image });

    this.pubSub.publish('updateUserData', {
      updateUserData: {
        user,
        userId: id,
      },
    });

    return user;
  }

  @Mutation(() => User)
  public async updateHpAndMp(userId: string) {
    const user = await this.usersService.getUser(userId);

    this.pubSub.publish('updateUserDataByBrain', {
      updateUserDataByBrain: {
        user,
      },
    });

    return user;
  }

  @Subscription((returns) => User, {})
  userAdded() {
    return this.pubSub.asyncIterator('userAdded');
  }

  @Subscription((returns) => [GameLog], {
    filter: (payload, variables) => {
      return payload.updateLogsByOnline.projectId === variables.projectId;
    },
    resolve: (values) => {
      return values.updateLogsByOnline.gameLogs;
    },
  })
  updateLogsByOnline(
    @Args({ name: 'projectId', type: () => String }) projectId: string,
  ) {
    return this.pubSub.asyncIterator('updateLogsByOnline');
  }

  @Subscription((returns) => [Group], {
    filter: (payload, variables) => {
      return payload.updateGroupsByOnline.projectId === variables.projectId;
    },
    resolve: (values) => {
      return values.updateGroupsByOnline.groups;
    },
  })
  updateGroupsByOnline(
    @Args({ name: 'projectId', type: () => String }) projectId: string,
  ) {
    return this.pubSub.asyncIterator('updateGroupsByOnline');
  }

  @Subscription((returns) => User, {
    filter: (payload, variables) => {
      return payload.updateUserData.userId === variables.userId;
    },
    resolve: (values) => {
      return values.updateUserData.user;
    },
  })
  updateUserData(@Args({ name: 'userId', type: () => String }) userId: string) {
    return this.pubSub.asyncIterator('updateUserData');
  }

  @Subscription((returns) => User, {
    filter: (payload, variables) => {
      return payload.updateUserDataByBrain.user.id === variables.userId;
    },
    resolve: (values) => {
      return values.updateUserDataByBrain.user;
    },
  })
  updateUserDataByBrain(
    @Args({ name: 'userId', type: () => String }) userId: string,
  ) {
    return this.pubSub.asyncIterator('updateUserDataByBrain');
  }

  // @Mutation((returns) => Boolean)
  // async removeUser(@Args({ name: 'id', type: () => Int }) uid: string) {
  //   return this.usersService.remove(uid);
  // }
}
