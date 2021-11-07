import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

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
  image: string;

  // @CreateDateColumn({ name: 'createdAt' })
  // @Field()
  // createdAt: Date;
}
