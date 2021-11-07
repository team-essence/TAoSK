import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
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
    length: 50,
  })
  @Field()
  company: string;

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

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  memo: string;

  @Column({ type: 'int' })
  @Field()
  rank: number;

  // @CreateDateColumn()
  // @Field()
  // created_at: Date;

  // @UpdateDateColumn()
  // @Field()
  // updated_at: Date;

  // @DeleteDateColumn()
  // @Field()
  // deleted_at: Date;
}
