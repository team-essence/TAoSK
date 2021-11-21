import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity('certification')
@ObjectType()
export class Certification {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  name: string;

  @Field(() => User, { defaultValue: '' })
  @ManyToOne(() => User, (user) => user.certifications)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
