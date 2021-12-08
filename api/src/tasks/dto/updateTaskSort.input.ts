import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsInt, IsObject, IsArray, IsBoolean } from 'class-validator';

@InputType()
export class UpdateTaskSort {
  @Field(() => [UpdateTask])
  tasks: UpdateTask[];

  @Field()
  @IsString()
  project_id: string;

  @IsString()
  @Field()
  user_id: string;
}

@InputType()
class UpdateTask {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsInt()
  vertical_sort: number;

  @Field()
  @IsString()
  list_id: string;

  @Field()
  @IsBoolean()
  completed_flg: boolean;
}
