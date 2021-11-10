import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity('occupations')
@ObjectType()
export class Occupation {
  //id
  @PrimaryColumn()
  @Column({ type: 'int', unsigned: true })
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
