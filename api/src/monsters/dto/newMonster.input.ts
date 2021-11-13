import { Field, InputType } from '@nestjs/graphql';
import {
  MaxLength,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
} from 'class-validator';

@InputType()
export class NewMonsterInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNumber()
  @IsInt()
  @Field()
  type: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  story: string;
}
