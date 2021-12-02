import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RemoveListInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  list_id: string;
}
