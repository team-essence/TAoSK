import { Field, ID, ObjectType } from '@nestjs/graphql';
import { List } from 'src/lists/list';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('list_sorts')
@ObjectType()
export class ListSort {
  //id
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //タスク順序
  @Column({ type: 'int', unsigned: true })
  @Field()
  task_list: number;

  //リストID
  @Field(() => List, { defaultValue: '' })
  @ManyToOne(() => List, (list) => list.listSorts)
  @JoinColumn({ name: 'list_id' })
  list: List;
}
