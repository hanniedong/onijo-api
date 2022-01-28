import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

@ArgsType()
export class GetConfirmPhoneNumberVerificationArgs {
  @IsNotEmpty()
  @Field()
  verificationCode: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @Field()
  phoneNumber: string;
}