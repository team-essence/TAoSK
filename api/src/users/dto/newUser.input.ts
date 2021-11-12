import { Field, InputType, Int } from '@nestjs/graphql';
import {
  Max,
  MaxLength,
  Min,
  IsString,
  IsBoolean,
  IsNumber,
  IsDateString,
} from 'class-validator';

@InputType()
export class NewUserInput {
  @IsString()
  @Field()
  id: string;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  icon_image: string;

  @IsBoolean()
  @Field()
  online_flg: boolean;

  @IsNumber()
  @Field()
  hp: number;

  @IsNumber()
  @Field()
  mp: number;

  @IsNumber()
  @Field()
  occupation_id: number;

  @IsString()
  @Field()
  company: string;

  @IsString()
  @Field()
  memo: string;

  @IsNumber()
  @Field()
  technology: number;

  @IsNumber()
  @Field()
  achievement: number;

  @IsNumber()
  @Field()
  motivation: number;

  @IsNumber()
  @Field()
  solution: number;

  @IsNumber()
  @Field()
  plan: number;

  @IsNumber()
  @Field()
  design: number;

  @IsNumber()
  @Field()
  exp: number;
}
