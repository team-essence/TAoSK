import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatedTask {
  @Field(() => ID)
  id: number;

  @Field()
  high_status_name: string;

  @Field()
  is_completed: boolean;
}
