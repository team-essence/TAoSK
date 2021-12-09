import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class NewAllocationInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  task_id: string;
}

@InputType()
export class assignTaskInput {
  @Field(() => [assignUserInput])
  users: assignUserInput[];
}

@InputType()
class assignUserInput {
  @Field()
  @IsString()
  user_id: string;
}
