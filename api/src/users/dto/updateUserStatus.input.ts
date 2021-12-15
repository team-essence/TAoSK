import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class updateUserStatus {
  @IsString()
  @Field()
  id: string;

  @IsString()
  @Field()
  hp: string;

  @IsString()
  @Field()
  mp: string;
}
