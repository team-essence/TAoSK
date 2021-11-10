import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Monster } from 'src/monsters/monster';
import { Group } from 'src/groups/group';
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
  @PrimaryGeneratedColumn()
  @Column({ type: 'int', unsigned: true })
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
  @Field()
  @ManyToOne(() => Monster, (monster) => monster.project)
  @JoinColumn({ name: 'monster_id' })
  monster: Monster;

  //1対多
  @OneToMany(() => Group, (group) => group.prroject)
  @Field(() => [Group])
  group: Group[];

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
