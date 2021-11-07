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
  company: string;

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
  memo: string;

  @IsNumber()
  @Field()
  rank: number;

  // @IsDateString()
  // @Field()
  // created_at: Date;

  // @IsDateString()
  // @Field()
  // updated_at: Date;

  // @IsDateString()
  // @Field()
  // deleted_at: Date;
}
