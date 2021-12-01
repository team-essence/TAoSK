import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('companies')
@ObjectType()
export class Company {
  //uid
  @PrimaryColumn()
  @Field(() => ID)
  uid: string;

  //企業名
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Field()
  name: string;
}
