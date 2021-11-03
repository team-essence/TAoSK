import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum GenderType {
  Male = 'male',
  Female = 'female',
}

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  uid: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  gender: GenderType;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
