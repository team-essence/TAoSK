import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/projects/project';
import { List } from 'src/lists/list';
import { Chat } from 'src/chats/chat';
import { Allocation } from 'src/allocations/allocation';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('tasks')
@ObjectType()
export class Task {
  //id
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //タイトル
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  title: string;

  //概要
  @Column({
    type: 'varchar',
    length: 1024,
  })
  @Field()
  overview: string;

  //技術力
  @Column({ type: 'int' })
  @Field()
  technology: number;

  //達成力
  @Column({ type: 'int' })
  @Field()
  achievement: number;

  //問題発見・解決力
  @Column({ type: 'int' })
  @Field()
  solution: number;

  //意欲
  @Column({ type: 'int' })
  @Field()
  motivation: number;

  //設計力
  @Column({ type: 'int' })
  @Field()
  plan: number;

  //デザイン力
  @Column({ type: 'int' })
  @Field()
  design: number;

  //縦並び順
  @Column({ type: 'int' })
  @Field()
  vertical_sort: number;

  //期日
  @Column({ type: 'datetime' })
  @Field()
  end_date: Date;

  //プロジェクトID
  @Field(() => Project, { defaultValue: '' })
  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  //リストID
  @Field(() => List, { defaultValue: '' })
  @ManyToOne(() => List, (list) => list.tasks)
  @JoinColumn({ name: 'list_id' })
  list: List;

  //1対多
  @OneToMany(() => Chat, (chat) => chat.task)
  @Field(() => [Chat])
  chats: Chat[];

  @OneToMany(() => Allocation, (allocation) => allocation.task)
  @Field(() => [Allocation])
  allocations: Allocation[];

  //作成日
  @CreateDateColumn()
  @Field()
  created_at: Date;

  //更新日
  @UpdateDateColumn()
  @Field()
  updated_at: Date;

  //削除日
  @DeleteDateColumn()
  @Field()
  deleted_at: Date;
}
