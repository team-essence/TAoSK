import { Field, InputType } from '@nestjs/graphql';
import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsInt,
  IsDate,
  IsBoolean,
} from 'class-validator';

@InputType()
export class NewProjectInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @Field()
  @IsString()
  @MaxLength(255)
  overview: string;

  @Field()
  @IsInt()
  hp: number;

  @Field()
  @IsInt()
  difficulty: number;

  @Field()
  @IsDate()
  end_date: Date;

  @Field()
  @IsBoolean()
  project_end_flg: boolean;
}
