import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Specie } from 'src/species/specie';
import { Project } from 'src/projects/project';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('monsters')
@ObjectType()
export class Monster {
  //id
  @PrimaryGeneratedColumn()
  @Column({ type: 'int', unsigned: true })
  @Field(() => ID)
  id: number;

  //モンスター名
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Field()
  name: string;

  //種族
  @Column({ type: 'int' })
  @Field()
  type: number;

  //ストーリー
  @Column({
    type: 'varchar',
    length: 255,
  })
  @Field()
  story: string;

  //多対１
  //種族ID
  @Field()
  @ManyToOne(() => Specie, (specie) => specie.monster)
  @JoinColumn({ name: 'specie_id' })
  specie: Specie;

  //1対多
  @OneToMany(() => Project, (project) => project.monster)
  @Field(() => [Project])
  project: Project[];
}
