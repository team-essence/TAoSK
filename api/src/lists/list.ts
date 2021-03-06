import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/projects/project';
import { ListSort } from 'src/list-sorts/list-sort';
import { Task } from 'src/tasks/task';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('lists')
@ObjectType()
export class List {
  //id
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //リストID
  @Column({ type: 'varchar', length: 255 })
  @Field()
  list_id: string;

  //リスト名
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  name: string;

  //プロジェクトID
  @Field(() => Project, { defaultValue: '' })
  @ManyToOne(() => Project, (project) => project.lists)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  //1対多
  @OneToMany(() => ListSort, (listSort) => listSort.list)
  @Field(() => [ListSort])
  listSorts: ListSort[];

  @OneToMany(() => Task, (task) => task.list)
  @Field(() => [Task])
  tasks: Task[];
}
