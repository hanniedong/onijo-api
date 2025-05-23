import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetUserArgs {
  @Field()
  @IsNotEmpty()
  id: number;
}