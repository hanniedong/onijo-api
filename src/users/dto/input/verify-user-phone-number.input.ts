import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

@InputType()
export class VerifyUserPhoneNumberInput {
  @Field()
  @IsNotEmpty()
  verificationCode: string;

  @Field()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @Field()
  @IsNotEmpty()
  userId: string;
}