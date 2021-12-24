import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/lists/list';
import { Repository } from 'typeorm';
import { RemoveListSortInput } from './dto/removeListSort.input';
import { UpdateListSort } from './dto/updateListSort.input';
import { ListSort } from './list-sort';

@Injectable()
export class ListSortsService {
  constructor(
    @InjectRepository(ListSort)
    private listSortRepository: Repository<ListSort>,
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  async update(updateListSort: UpdateListSort): Promise<{
    result: boolean;
    lists: List[];
  }> {
    try {
      let projectId = '';
      for (let index = 0; index < updateListSort.listSort.length; index++) {
        const listSort = await this.listSortRepository.findOne(
          updateListSort.listSort[index].id,
          {
            relations: ['list', 'list.project'],
          },
        );
        projectId = listSort.list.project.id;
        listSort.task_list = updateListSort.listSort[index].task_list;
        await this.listSortRepository.save(listSort).catch((err) => {
          throw err;
        });
      }

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
        .where('project.id=:id', { id: projectId })
        .getMany();

      return {
        result: true,
        lists: lists,
      };
    } catch (error) {
      return {
        result: false,
        lists: [],
      };
    }
  }
}
