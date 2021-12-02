import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RemoveListInput {
  @IsNotEmpty()
  @IsInt()
  @Field()
  list_id: number;
}
