import { Field, InputType, Int } from '@nestjs/graphql';
import {
  Max,
  MaxLength,
  Min,
  IsString,
  IsEnum,
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
  image: string;

  // @IsDateString()
  // @Field()
  // createdAt: Date;
}
