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

@Entity('invitations')
@ObjectType()
export class Invitation {
  //id
  @PrimaryGeneratedColumn()
  @Column({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //ユーザID
  @Field()
  @ManyToOne(() => User, (user) => user.invitation)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //プロジェクトID
  @Field()
  @ManyToOne(() => Project, (project) => project.invitation)
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
