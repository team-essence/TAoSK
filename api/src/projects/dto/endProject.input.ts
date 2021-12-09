import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class EndProjectInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  project_id: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  user_id: string;
}
