import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  @Field()
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  icon_image: string;

  @Column({ type: 'boolean' })
  @Field()
  online_flg: boolean;

  @Column({ type: 'int' })
  @Field()
  hp: number;

  @Column({ type: 'int' })
  @Field()
  mp: number;

  @Column({ type: 'int' })
  @Field()
  occupation_id: number;

  @Column({ type: 'int' })
  @Field()
  companies_id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  memo: string;

  @Column({ type: 'int' })
  @Field()
  technology: number;

  @Column({ type: 'int' })
  @Field()
  achievement: number;

  @Column({ type: 'int' })
  @Field()
  motivation: number;

  @Column({ type: 'int' })
  @Field()
  solution: number;

  @Column({ type: 'int' })
  @Field()
  plan: number;

  @Column({ type: 'int' })
  @Field()
  design: number;

  @Column({ type: 'int' })
  @Field()
  exp: number;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field()
  updated_at: Date;

  @DeleteDateColumn()
  @Field()
  deleted_at: Date;
}
