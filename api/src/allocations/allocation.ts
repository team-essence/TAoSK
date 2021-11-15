import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user';
import { Task } from 'src/tasks/task';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('allocations')
@ObjectType()
export class Allocation {
  //id
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //ユーザID
  @Field(() => User, { defaultValue: '' })
  @ManyToOne(() => User, (user) => user.allocation)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //タスクID
  @Field()
  @ManyToOne(() => Task, (task) => task.allocation)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  //作成日
  @CreateDateColumn()
  @Field()
  created_at: Date;

  //削除日
  @DeleteDateColumn()
  @Field()
  deleted_at: Date;
}
