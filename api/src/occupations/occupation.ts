import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('occupations')
@ObjectType()
export class Occupation {
  //id
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //職種名
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  name: string;
}
