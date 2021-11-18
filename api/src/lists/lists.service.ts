import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';
import { Repository } from 'typeorm';
import { List } from './list';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  findByProjectId(projectId: string): Promise<List[]> {
    const lists = this.listRepository.find({
      relations: [
        'listSorts',
        'tasks',
        'tasks.allocations',
        'tasks.allocations.user',
      ],
      where: {
        project: {
          id: projectId,
        },
      },
    });

    if (!lists) throw new NotFoundException();

    return lists;
  }
}
