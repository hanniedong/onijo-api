import { IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class InitiatePhoneNumberVerificationDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}