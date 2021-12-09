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
export class AssignTaskInput {
  @Field(() => [AssignUserInput])
  users: AssignUserInput[];
}

@InputType()
class AssignUserInput {
  @Field()
  @IsString()
  user_id: string;
}
