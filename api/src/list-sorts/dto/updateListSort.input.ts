import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class UpdateListSort {
  @Field(() => [UpdateListSortObject])
  listSort: UpdateListSortObject[];
}

@InputType()
class UpdateListSortObject {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsInt()
  task_list: number;
}
