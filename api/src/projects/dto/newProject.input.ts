import { Field, InputType } from '@nestjs/graphql';
import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsInt,
  IsDate,
  IsBoolean,
  IsArray,
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
  @IsString()
  end_date: string;

  @Field()
  @IsBoolean()
  project_end_flg: boolean;
}

@InputType()
export class SelectUser {
  @IsArray()
  @Field(() => [String])
  ids: [string];
}
