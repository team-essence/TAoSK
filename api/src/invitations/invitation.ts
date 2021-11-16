import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user';
import { Project } from 'src/projects/project';
import {
  Entity,
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
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //ユーザID
  @Field(() => User, { defaultValue: '' })
  @ManyToOne(() => User, (user) => user.invitations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //プロジェクトID
  @Field(() => Project, { defaultValue: '' })
  @ManyToOne(() => Project, (project) => project.invitations)
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
