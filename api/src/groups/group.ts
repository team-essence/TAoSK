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
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('groups')
@ObjectType()
export class Group {
  //id
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //権限フラグ
  @Column({ type: 'boolean' })
  @Field()
  authority_flg: boolean;

  //ユーザID
  @Field(() => User, { defaultValue: '' })
  @ManyToOne(() => User, (user) => user.groups)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //プロジェクトID
  @Field(() => Project, { defaultValue: '' })
  @ManyToOne(() => Project, (project) => project.group)
  @JoinColumn({ name: 'project_id' })
  project: Project;

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
