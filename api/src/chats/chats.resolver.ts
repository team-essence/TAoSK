import { NotFoundException } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Chat } from './chat';
import { ChatsService } from './chats.service';

@Resolver()
export class ChatsResolver {
  constructor(private chatsService: ChatsService) {}

  @Query(() => [Chat])
  async getChats(@Args({ name: 'taskId' }) taskId: number): Promise<Chat[]> {
    return await this.chatsService.getChats(taskId).catch((err) => {
      throw err;
    });
  }

  @Mutation(() => Chat)
  async addChat(
    @Args({ name: 'comment' }) comment: string,
    @Args({ name: 'taskId' }) taskId: number,
    @Args({ name: 'userId' }) userId: string,
  ) {
    const chats = await this.chatsService.addChat(comment, taskId, userId);

    if (!chats) throw new NotFoundException();

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

    return chats;
  }

  @Mutation(() => [Chat])
  async deleteChat(
    @Args({ name: 'chatId' }) chatId: number,
    @Args({ name: 'taskId' }) taskId: number,
  ) {
    const chats = await this.chatsService.deleteChat(chatId, taskId);

    if (!chats) throw new NotFoundException();

    return chats;
  }
}
