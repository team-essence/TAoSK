import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class UpdateProjectInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @Field()
  @IsString()
  @MaxLength(255)
  overview: string;

  @Field()
  @IsInt()
  difficulty: number;

  @Field()
  @IsString()
  end_date: string;
}
