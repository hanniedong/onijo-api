import { Field, InputType } from '@nestjs/graphql';
import { IsPhoneNumber, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}