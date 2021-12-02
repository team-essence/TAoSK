import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsString } from 'class-validator';

@InputType()
export class NewCompanyInput {
  @Field()
  @IsString()
  uid: string;

  @Field()
  @IsString()
  @MaxLength(50)
  name: string;
}
