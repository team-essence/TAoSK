import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RemoveListInput {
  @IsNotEmpty()
  @IsInt()
  @Field()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  project_id: string;
}
