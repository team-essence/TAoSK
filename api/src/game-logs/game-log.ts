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
} from 'typeorm';

@Entity('logs')
@ObjectType()
export class GameLog {
  // id
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //内容
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  context: string;

  //ユーザID
  @Field(() => User, { defaultValue: '' })
  @ManyToOne(() => User, (user) => user.gameLog)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //プロジェクトID
  @Field(() => Project, { defaultValue: '' })
  @ManyToOne(() => Project, (project) => project.gameLog)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  //作成日
  @CreateDateColumn()
  @Field()
  created_at: Date;
}
