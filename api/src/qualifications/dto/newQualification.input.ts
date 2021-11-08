import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class NewQualificationInput {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  user_id: string;
}
