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

  @Field(() => User, { defaultValue: '' })
  @ManyToOne(() => User, (user) => user.qualifications)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
