import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetUserProfileArgs {
  @Field()
  @IsNotEmpty()
  userId: number;
}