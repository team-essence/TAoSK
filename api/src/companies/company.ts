import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companies')
@ObjectType()
export class Company {
  //uid
  @PrimaryGeneratedColumn()
  @Field()
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
