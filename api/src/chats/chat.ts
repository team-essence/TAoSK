import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/tasks/task';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('chats')
@ObjectType()
export class Chat {
  //id
  @PrimaryGeneratedColumn()
  @Column({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //コメント内容
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  comment: string;

  //タスクID
  @Field()
  @ManyToOne(() => Task, (task) => task.chat)
  @JoinColumn({ name: 'task_id' })
  task: Task;

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
