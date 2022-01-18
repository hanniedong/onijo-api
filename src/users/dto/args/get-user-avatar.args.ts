import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetUserAvatarArgs {
  @Field()
  @IsNotEmpty()
  uuid: string;
}