import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/tasks/task';
import { User } from 'src/users/user';
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
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
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
  @Field(() => Task, { defaultValue: '' })
  @ManyToOne(() => Task, (task) => task.chat)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  //ユーザID
  @Field(() => User, { defaultValue: '' })
  @ManyToOne(() => User, (user) => user.chat)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
