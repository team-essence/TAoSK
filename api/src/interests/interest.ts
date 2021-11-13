import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity('interests')
@ObjectType()
export class Interest {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Field()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  context: string;

  @Field(() => User, { defaultValue: '' })
  @ManyToOne(() => User, (user) => user.interest)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
