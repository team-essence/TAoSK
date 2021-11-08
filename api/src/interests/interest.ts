import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('interests')
@ObjectType()
export class Interest {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  context: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field(() => ID)
  user_id: string;
}
