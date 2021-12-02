import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class RemoveListInput {
  @IsNotEmpty()
  @IsInt()
  @Field()
  list_id: string;
}
