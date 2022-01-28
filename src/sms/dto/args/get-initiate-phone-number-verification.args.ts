import { ArgsType, Field } from '@nestjs/graphql';
import {  IsPhoneNumber } from 'class-validator';

@ArgsType()
export class GetInitiatePhoneNumberVerificationArgs {
  @Field()
  @IsPhoneNumber()
  phoneNumber: string;
}