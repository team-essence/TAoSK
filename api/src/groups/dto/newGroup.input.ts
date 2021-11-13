import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class NewGroupInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  user_id: string;

  @IsNotEmpty()
  @IsInt()
  @Field()
  project_id: number;

  @IsBoolean()
  @Field()
  authority_flg: boolean;
}
