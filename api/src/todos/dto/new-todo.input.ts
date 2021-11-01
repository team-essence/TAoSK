import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class NewTodoInput {
  @Field()
  @IsString() // 文字列に制限する
  @Length(5, 140, { message: '5文字以上140文字以内です' }) // 最低5文字、最長140文字
  name: string;

  @Field(() => Int)
  priority: number;

  @Field()
  completed: boolean;
}
