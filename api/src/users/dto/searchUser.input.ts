import { Field, InputType, Int } from '@nestjs/graphql';
import {
  Max,
  MaxLength,
  Min,
  IsString,
  IsBoolean,
  IsNumber,
  IsDateString,
  IsArray,
} from 'class-validator';

@InputType()
export class SearchUserInput {
  @IsArray()
  @Field(() => [String])
  ids: [string];

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  company: string;
}
