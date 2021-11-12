import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user';
import { Project } from 'src/projects/project';
import {
  Entity,
  Column,
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
  @PrimaryGeneratedColumn()
  @Column({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //ユーザID
  @Field(() => User, { defaultValue: '' })
  @ManyToOne(() => User, (user) => user.group)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //プロジェクトID
  @Field()
  @ManyToOne(() => Project, (project) => project.group)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  //作成日
  @CreateDateColumn()
  @Field()
  created_at: Date;

  //削除日
  @DeleteDateColumn()
  @Field()
  deleted_at: Date;
}
