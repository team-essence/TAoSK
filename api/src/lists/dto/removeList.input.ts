import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class RemoveListInput {
  @IsNotEmpty()
  @IsInt()
  @Field()
  id: number;
}
