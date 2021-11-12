import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class NewListSortInput {
  @IsNotEmpty()
  @IsInt()
  @Field()
  task_list: number;
}
