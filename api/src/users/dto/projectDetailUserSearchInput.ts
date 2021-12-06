import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType()
export class ProjectDetailUserSearchInput {
  @IsString()
  @Field()
  project_id: string;

  @IsString()
  @Field()
  input: string;

  @IsString()
  @Field()
  company: string;
}
