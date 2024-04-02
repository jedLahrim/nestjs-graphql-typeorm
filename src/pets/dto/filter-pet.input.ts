import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FilterPetInput {
  @Field(() => String)
  userId: string;
  @Field(() => Int)
  take?: number;
  @Field(() => Int)
  skip?: number;
}
