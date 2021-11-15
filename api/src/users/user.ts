import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Interest } from 'src/interests/interest';
import { Qualification } from 'src/qualifications/qualification';
import { Group } from 'src/groups/group';
import { Invitation } from 'src/invitations/invitation';
import { Allocation } from 'src/allocations/allocation';
import { GameLog } from 'src/game-logs/game-log';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  @Field()
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  icon_image: string;

  @Column({ type: 'boolean' })
  @Field()
  online_flg: boolean;

  @Column({ type: 'int' })
  @Field()
  hp: number;

  @Column({ type: 'int' })
  @Field()
  mp: number;

  @Column({ type: 'int' })
  @Field()
  occupation_id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  @Field()
  company: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  memo: string;

  @Column({ type: 'int' })
  @Field()
  technology: number;

  @Column({ type: 'int' })
  @Field()
  achievement: number;

  @Column({ type: 'int' })
  @Field()
  motivation: number;

  @Column({ type: 'int' })
  @Field()
  solution: number;

  @Column({ type: 'int' })
  @Field()
  plan: number;

  @Column({ type: 'int' })
  @Field()
  design: number;

  @Column({ type: 'int' })
  @Field()
  exp: number;

  @OneToMany(() => Qualification, (qualification) => qualification.user)
  @Field(() => [Qualification])
  qualifications: Qualification[];

  @OneToMany(() => Interest, (interest) => interest.user)
  @Field(() => [Interest])
  interest: Interest[];

  @OneToMany(() => Group, (group) => group.user)
  @Field(() => [Group])
  group: Group[];

  @OneToMany(() => Invitation, (invitation) => invitation.user)
  @Field(() => [Invitation])
  invitation: Invitation[];

  @OneToMany(() => Allocation, (allocation) => allocation.user)
  @Field(() => [Allocation])
  allocation: Allocation[];

  @OneToMany(() => GameLog, (gameLog) => gameLog.user)
  @Field(() => [GameLog])
  gameLog: GameLog[];

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field()
  updated_at: Date;

  @DeleteDateColumn()
  @Field()
  deleted_at: Date;
}
