import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/lists/list';
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
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  getChats(taskId: number): Promise<Chat[]> {
    const chats = this.chatRepository.find({
      where: {
        task: {
          id: taskId,
        },
      },
      relations: ['user', 'user.occupation', 'task', 'task.project'],
    });
    if (!chats) throw new NotFoundException();

    return chats;
  }

  async addChat(
    comment: string,
    taskId: number,
    userId: string,
  ): Promise<{
    chats: Chat[];
    project_id: string;
    lists: List[];
  }> {
    const task = await this.taskRepository.findOne(taskId, {
      relations: ['project'],
    });
    const user = await this.userRepository.findOne(userId);
    const chat = this.chatRepository.create({
      comment: comment,
      task,
      user,
    });

    await this.chatRepository.save(chat).catch(() => {
      new InternalServerErrorException();
    });

    const chats = await this.chatRepository.find({
      where: {
        task: {
          id: taskId,
        },
      },
      relations: ['user', 'user.occupation', 'task', 'task.project'],
    });
    if (!chats) throw new NotFoundException();

    const lists = await this.listRepository
      .createQueryBuilder('lists')
      .leftJoinAndSelect('lists.listSorts', 'listSorts')
      .leftJoinAndSelect('lists.tasks', 'tasks')
      .leftJoinAndSelect('lists.project', 'project')
      .leftJoinAndSelect('tasks.chats', 'chats')
      .leftJoinAndSelect('tasks.allocations', 'allocations')
      .leftJoinAndSelect('allocations.user', 'allocationsUser')
      .leftJoinAndSelect(
        'allocationsUser.occupation',
        'allocationUserOccupation',
      )
      .loadRelationCountAndMap('tasks.chatCount', 'tasks.chats')
      .where('project.id=:id', { id: task.project.id })
      .getMany();

    return { chats, project_id: task.project.id, lists };
  }

  async updateChat(
    chatId: number,
    comment: string,
    taskId: number,
  ): Promise<{
    chats: Chat[];
    project_id: string;
  }> {
    const chat = await this.chatRepository.findOne({
      where: {
        id: chatId,
      },
      relations: ['user', 'user.occupation', 'task', 'task.project'],
    });

    chat.comment = comment;

    await this.chatRepository.save(chat).catch(() => {
      new InternalServerErrorException();
    });

    const chats = await this.chatRepository.find({
      where: {
        task: {
          id: taskId,
        },
      },
      relations: ['user', 'user.occupation', 'task', 'task.project'],
    });
    if (!chats) throw new NotFoundException();

    const task = await this.taskRepository.findOne(taskId, {
      relations: ['project'],
    });
    if (!task) throw new NotFoundException();

    return { chats, project_id: task.project.id };
  }

  async deleteChat(
    chatId: number,
    taskId: number,
  ): Promise<{
    chats: Chat[];
    project_id: string;
    lists: List[];
  }> {
    const chat = await this.chatRepository.findOne({
      where: {
        id: chatId,
      },
    });

    await this.chatRepository.remove(chat).catch(() => {
      new InternalServerErrorException();
    });

    const chats = await this.chatRepository.find({
      where: {
        task: {
          id: taskId,
        },
      },
      relations: ['user', 'user.occupation', 'task', 'task.project'],
    });
    if (!chats) throw new NotFoundException();

    const task = await this.taskRepository.findOne(taskId, {
      relations: ['project'],
    });
    if (!task) throw new NotFoundException();

    const lists = await this.listRepository
      .createQueryBuilder('lists')
      .leftJoinAndSelect('lists.listSorts', 'listSorts')
      .leftJoinAndSelect('lists.tasks', 'tasks')
      .leftJoinAndSelect('lists.project', 'project')
      .leftJoinAndSelect('tasks.chats', 'chats')
      .leftJoinAndSelect('tasks.allocations', 'allocations')
      .leftJoinAndSelect('allocations.user', 'allocationsUser')
      .leftJoinAndSelect(
        'allocationsUser.occupation',
        'allocationUserOccupation',
      )
      .loadRelationCountAndMap('tasks.chatCount', 'tasks.chats')
      .where('project.id=:id', { id: task.project.id })
      .getMany();

    return { chats, project_id: task.project.id, lists };
  }
}
