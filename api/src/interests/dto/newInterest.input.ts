import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class NewInterestInput {
  @IsString()
  @Field()
  context: string;

  @IsString()
  @Field()
  user_id: string;
}
