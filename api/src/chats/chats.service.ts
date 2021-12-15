import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task';
import { User } from 'src/users/user';
import { Repository } from 'typeorm';
import { Chat } from './chat';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  getChats(taskId: number): Promise<Chat[]> {
    const chats = this.chatRepository.find({
      where: {
        task: {
          id: taskId,
        },
      },
      relations: ['user', 'user.occupation'],
    });
    if (!chats) throw new NotFoundException();

    return chats;
  }

  async addChat(
    comment: string,
    taskId: number,
    userId: string,
  ): Promise<Chat[]> {
    const task = await this.taskRepository.findOne(taskId);
    const user = await this.userRepository.findOne(userId);
    const chat = this.chatRepository.create({
      comment: comment,
      task,
      user,
    });

    await this.chatRepository.save(chat).catch(() => {
      new InternalServerErrorException();
    });

    const chats = this.chatRepository.find({
      where: {
        task: {
          id: taskId,
        },
      },
      relations: ['user', 'user.occupation'],
    });
    if (!chats) throw new NotFoundException();
    return chats;
  }

  async updateChat(
    chatId: number,
    comment: string,
    taskId: number,
  ): Promise<Chat[]> {
    const chat = await this.chatRepository.findOne({
      where: {
        id: chatId,
      },
      relations: ['user', 'user.occupation'],
    });

    chat.comment = comment;

    await this.chatRepository.save(chat).catch(() => {
      new InternalServerErrorException();
    });

    const chats = this.chatRepository.find({
      where: {
        task: {
          id: taskId,
        },
      },
      relations: ['user', 'user.occupation'],
    });
    if (!chats) throw new NotFoundException();

    return chats;
  }

  async deleteChat(chatId: number, taskId: number): Promise<Chat[]> {
    const chat = await this.chatRepository.findOne({
      where: {
        id: chatId,
      },
    });

    await this.chatRepository.remove(chat).catch(() => {
      new InternalServerErrorException();
    });

    const chats = this.chatRepository.find({
      where: {
        task: {
          id: taskId,
        },
      },
      relations: ['user', 'user.occupation'],
    });
    if (!chats) throw new NotFoundException();

    return chats;
  }
}
