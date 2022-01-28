import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

@ArgsType()
export class GetUpdatePasswordArgs {
  @Field()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @Field()
  @IsNotEmpty()
  password: string;
}