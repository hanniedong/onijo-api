import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class VerificationCodeDto {
  @IsNotEmpty()
  verificationCode: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}