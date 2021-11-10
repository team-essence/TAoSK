import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Monster } from 'src/monsters/monster';
@Entity('species')
@ObjectType()
export class Specie {
  // id
  @PrimaryGeneratedColumn()
  @Column({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //種族名
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Field()
  name: string;

  //1対多
  @OneToMany(() => Monster, (monster) => monster.specie)
  @Field(() => [Monster])
  monster: Monster[];
}
