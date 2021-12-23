import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SmsService } from './sms.service';
import { AuthGuard } from '@nestjs/passport';
import { InitiatePhoneNumberVerificationDto } from './dto/initate-phone-number-verification.dto';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import { VerificationCodeDto } from './dto/verification-code.dto';
import { UsersService } from '@users/users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService, private readonly usersService: UsersService) { }

  @Post('initiate-verification')
  async initiatePhoneNumberVerification(
    @Body() phoneNumber: InitiatePhoneNumberVerificationDto,
    @Req() request: RequestWithUser): Promise<any> {
    try {
      if (request.user.isPhoneNumberConfirmed) {
        throw new BadRequestException('Phone number already confirmed');
      }
      return this.smsService.initiatePhoneNumberVerification(phoneNumber);
    } catch (e) {
      console.error(e)
    }
  }

  @Post('confirm-verification')
  async confirmPhoneNumber(
    @Body() verificationCodeDto: VerificationCodeDto,
    @Req() request: RequestWithUser): Promise<any> {
    try {
      const userId = request.user.id
      const { phoneNumber, verificationCode } = verificationCodeDto
      const phoneNumberConfirmation = await this.smsService.confirmPhoneNumber(phoneNumber, verificationCode);
      if (phoneNumberConfirmation?.valid) {
        console.log(userId)
        await this.usersService.updateUserPhoneNumberConfirmation(userId)
      }
    } catch (e) {
      console.error(e)
    }
  }
}
