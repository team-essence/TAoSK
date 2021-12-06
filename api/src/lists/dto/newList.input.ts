import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class NewListInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  project_id: string;

  @IsInt()
  @Field()
  task_list: number;
}
