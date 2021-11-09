import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { User } from 'src/users/user';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@InputType()
export class NewInterestInput {
  @IsString()
  @Field()
  context: string;

  @IsString()
  @Field()
  user_id: string;
}

@InputType()
export class NewInterestClientInput {
  @IsArray()
  @Field(() => [String])
  context: [string];
}
