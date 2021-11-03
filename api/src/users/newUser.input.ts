import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, MaxLength, Min, IsString, IsEnum } from 'class-validator';
import { GenderType } from './user';

@InputType()
export class NewUserInput {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  @IsEnum(GenderType)
  gender: GenderType;
}
