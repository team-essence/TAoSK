import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveListSortInput } from './dto/removeListSort.input';
import { UpdateListSort } from './dto/updateListSort.input';
import { ListSort } from './list-sort';

@Injectable()
export class ListSortsService {
  constructor(
    @InjectRepository(ListSort)
    private listSortRepository: Repository<ListSort>,
  ) {}

  async update(updateListSort: UpdateListSort): Promise<boolean> {
    try {
      for (let index = 0; index < updateListSort.listSort.length; index++) {
        const listSort = await this.listSortRepository.findOne(
          updateListSort.listSort[index].id,
        );
        listSort.task_list = updateListSort.listSort[index].task_list;
        await this.listSortRepository.save(listSort).catch((err) => {
          throw err;
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
