import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsString } from 'class-validator';

@InputType()
export class NewChatInput {
  //コメント内容
  @Field()
  @IsString()
  @MaxLength(255)
  comment: string;
}
