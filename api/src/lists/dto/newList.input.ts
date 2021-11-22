import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class NewListInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Field()
  project_id: number;

  @IsInt()
  @Field()
  task_list: number;
}
