import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { User } from 'src/users/user';
import { JoinColumn, ManyToOne } from 'typeorm';

@InputType()
export class NewCertificationInput {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  user_id: string;
}

@InputType()
export class NewCertificationClientInput {
  @IsArray()
  @Field(() => [String])
  name: [string];
}
