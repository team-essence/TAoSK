import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Field()
  user_id: string;

  @Field()
  @IsNotEmpty()
  @IsInt()
  @Field()
  project_id: number;

  @IsBoolean()
  @Field()
  authority_flg: boolean;
}
