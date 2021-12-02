import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class RemoveListSortInput {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  list_id: number;
}
