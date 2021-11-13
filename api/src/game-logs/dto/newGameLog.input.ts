import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class NewLogInput {
  //内容
  @Field()
  @IsString()
  @MaxLength(255)
  comment: string;

  //ユーザID
  @IsNotEmpty()
  @IsString()
  @Field()
  user_id: string;
}
