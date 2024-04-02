import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePetInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  userId: string;
  @Field(() => String)
  description?: string;
}
