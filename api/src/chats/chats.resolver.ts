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
    const chats = await this.chatsService.addChat(comment, taskId, userId);
    if (!chats) throw new NotFoundException();

    this.pubSub.publish('updateChatSubscription', {
      updateChatSubscription: chats,
    });

    return chats;
  }

  @Mutation(() => [Chat])
  async updateChat(
    @Args({ name: 'chatId' }) chatId: number,
    @Args({ name: 'comment' }) comment: string,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    const chats = await this.chatsService.updateChat(chatId, comment, taskId);
    if (!chats) throw new NotFoundException();

    this.pubSub.publish('updateChatSubscription', {
      updateChatSubscription: chats,
    });

    return chats;
  }

  @Mutation(() => [Chat])
  async deleteChat(
    @Args({ name: 'chatId' }) chatId: number,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    const chats = await this.chatsService.deleteChat(chatId, taskId);
    if (!chats) throw new NotFoundException();

    this.pubSub.publish('updateChatSubscription', {
      updateChatSubscription: chats,
    });

    return chats;
  }

  @Subscription((returns) => [Chat], {
    filter: (payload, variables) => {
      return payload.updateChatSubscription.map((chat: Chat) => {
        return (
          chat.task.project.id === variables.projectId &&
          chat.task.id === variables.taskId
        );
      });
    },
  })
  updateChatSubscription(
    @Args({ name: 'projectId', type: () => String }) projectId: string,
    @Args({ name: 'taskId', type: () => String }) taskId: string,
  ) {
    return this.pubSub.asyncIterator('updateChatSubscription');
  }
}
