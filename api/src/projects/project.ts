import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Monster } from 'src/monsters/monster';
import { Group } from 'src/groups/group';
import { Invitation } from 'src/invitations/invitation';
import { List } from 'src/lists/list';
import { Task } from 'src/tasks/task';
import { GameLog } from 'src/game-logs/game-log';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('projects')
@ObjectType()
export class Project {
  //id
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //プロジェクト名
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  name: string;

  //概要
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  overview: string;

  //モンスターHP
  @Column({ type: 'int' })
  @Field()
  hp: number;

  //難易度(星の数)
  @Column({ type: 'int' })
  @Field()
  difficulty: number;

  //期日
  @Column({ type: 'datetime' })
  @Field()
  end_date: Date;

  //プロジェクト終了フラグ
  @Column({ type: 'boolean' })
  @Field()
  project_end_flg: boolean;

  //外部キー
  //モンスターid
  //多対１
  @Field(() => Monster, { defaultValue: '' })
  @ManyToOne(() => Monster, (monster) => monster.projects)
  @JoinColumn({ name: 'monster_id' })
  monster: Monster;

  @OneToMany(() => Group, (group) => group.project)
  @Field(() => [Group])
  groups: Group[];

  @OneToMany(() => Invitation, (invitation) => invitation.project)
  @Field(() => [Invitation])
  invitations: Invitation[];

  @OneToMany(() => List, (list) => list.project)
  @Field(() => [List])
  lists: List[];

  @OneToMany(() => Task, (task) => task.project)
  @Field(() => [Task])
  tasks: Task[];

  @OneToMany(() => GameLog, (gameLog) => gameLog.project)
  @Field(() => [GameLog])
  gameLogs: GameLog[];

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
