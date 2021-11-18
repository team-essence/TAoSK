import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsInt, IsObject, IsArray } from 'class-validator';

@InputType()
export class UpdateTaskSort {
  @Field(() => [UpdateTask])
  tasks: UpdateTask[];

  @Field()
  @IsString()
  project_id: string;
}

@InputType()
export class UpdateTask {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsInt()
  vertical_sort: number;

  @Field()
  @IsString()
  list_id: string;
}
