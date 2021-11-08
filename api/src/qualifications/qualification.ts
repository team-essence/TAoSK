import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('qualification')
@ObjectType()
export class Qualification {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field(() => ID)
  user_id: string;
}
