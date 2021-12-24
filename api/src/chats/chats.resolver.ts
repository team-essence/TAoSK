import { NotFoundException } from '@nestjs/common';
import { Args, Resolver, Query, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Chat } from './chat';
import { ChatsService } from './chats.service';

@Resolver()
export class ChatsResolver {
  private pubSub: PubSub;
  constructor(private chatsService: ChatsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [Chat])
  async getChats(@Args({ name: 'taskId' }) taskId: number): Promise<Chat[]> {
    return await this.chatsService.getChats(taskId).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => [Chat])
  async addChat(
    @Args({ name: 'comment' }) comment: string,
    @Args({ name: 'taskId' }) taskId: number,
    @Args({ name: 'userId' }) userId: string,
  ) {
    const result = await this.chatsService.addChat(comment, taskId, userId);
    if (!result.chats) throw new NotFoundException();

    this.pubSub.publish('updateChatSubscription', {
      updateChatSubscription: {
        chats: result.chats,
        projectId: result.project_id,
        taskId,
      },
    });

    return result.chats;
  }

  @Mutation(() => [Chat])
  async updateChat(
    @Args({ name: 'chatId' }) chatId: number,
    @Args({ name: 'comment' }) comment: string,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    const result = await this.chatsService.updateChat(chatId, comment, taskId);
    if (!result.chats) throw new NotFoundException();

    this.pubSub.publish('updateChatSubscription', {
      updateChatSubscription: {
        chats: result.chats,
        projectId: result.project_id,
        taskId,
      },
    });

    return result.chats;
  }

  @Mutation(() => [Chat])
  async deleteChat(
    @Args({ name: 'chatId' }) chatId: number,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    const result = await this.chatsService.deleteChat(chatId, taskId);
    if (!result.chats) throw new NotFoundException();

    this.pubSub.publish('updateChatSubscription', {
      updateChatSubscription: {
        chats: result.chats,
        projectId: result.project_id,
        taskId,
      },
    });

    return result.chats;
  }

  @Subscription((returns) => [Chat], {
    filter: (payload, variables) => {
      return (
        payload.updateChatSubscription.projectId === variables.projectId &&
        payload.updateChatSubscription.taskId === Number(variables.taskId)
      );
    },
    resolve: (values) => {
      return values.updateChatSubscription.chats;
    },
  })
  updateChatSubscription(
    @Args({ name: 'projectId', type: () => String }) projectId: string,
    @Args({ name: 'taskId', type: () => String }) taskId: string,
  ) {
    return this.pubSub.asyncIterator('updateChatSubscription');
  }
}
