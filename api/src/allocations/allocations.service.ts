import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/project';
import { Task } from 'src/tasks/task';
import { User } from 'src/users/user';
import { Repository } from 'typeorm';
import { Allocation } from './allocation';
import { NewAllocationInput } from './dto/newAllocation.input';

@Injectable()
export class AllocationsService {
  constructor(
    @InjectRepository(Allocation)
    private allocationRepository: Repository<Allocation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // async create({
  //   newAllocation,
  // }: {
  //   newAllocation: NewAllocationInput;
  // }): Promise<Allocation> {
  //   const user = await this.userRepository.findOne(newAllocation.user_id);
  //   if (!user) throw new NotFoundException();

  //   const task = await this.taskRepository.findOne(newAllocation.task_id);
  //   if (!task) throw new NotFoundException();

  //   const allocation = this.allocationRepository.create({
  //     user,
  //     task,
  //   });

  //   await this.allocationRepository.save(allocation).catch(() => {
  //     new InternalServerErrorException();
  //   });

  //   return allocation;
  // }

  // async unassign(userId: string, taskId): Promise<Allocation[]> {
  //   const allocation = await this.allocationRepository.findOne({
  //     user: {
  //       id: userId,
  //     },
  //     task: {
  //       id: taskId,
  //     },
  //   });

  //   this.allocationRepository.remove(allocation).catch(() => {
  //     new InternalServerErrorException();
  //   });

  //   const allocations = this.allocationRepository.find({
  //     where: {
  //       task: {
  //         id: taskId,
  //       },
  //     },
  //     relations: ['user', 'task'],
  //   });
  //   if (!allocations) throw new NotFoundException();

  //   return allocations;
  // }

  completedTask(userId: string): Promise<Allocation[]> {
    const allocations = this.allocationRepository.find({
      where: {
        user: {
          id: userId,
        },
        task: {
          completed_flg: true,
        },
      },
      relations: ['task'],
    });

    return allocations;
  }
}
