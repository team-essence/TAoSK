import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class NewAllocationInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  task_id: string;
}
