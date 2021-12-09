import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class NewLogInput {
  //内容
  @Field()
  @IsString()
  @MaxLength(255)
  context: string;

  //ユーザID
  @IsNotEmpty()
  @IsString()
  @Field()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  project_id: string;
}
