import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class NewAllocationInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  user_id: string;

  @IsNotEmpty()
  @IsInt()
  @Field()
  project_id: number;
}
