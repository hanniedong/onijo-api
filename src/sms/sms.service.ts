import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@users/users.service';

@Injectable()
export class SmsService {
  constructor(
    @InjectTwilio()
    private readonly twilioClient: TwilioClient,
  ) { }

  async sendSMS() {
    try {
      return await this.twilioClient.messages.create({
        body: 'SMS Body, sent to the phone!',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+15103661172',
      });
    } catch (e) {
      return e;
    }
  }

  async initiatePhoneNumberVerification(phoneNumber: string) {
    const serviceId = process.env.TWILIO_SERVICE_ID;

    try {
      return await this.twilioClient.verify.services(serviceId).verifications.create({ to: phoneNumber, channel: 'sms' })
    } catch (e) {
      return e
    }
  }

  async confirmPhoneNumber(phoneNumber: string, verificationCode: string) {
    const serviceId = process.env.TWILIO_SERVICE_ID;
    console.log(serviceId)
    const result = await this.twilioClient.verify.services(serviceId)
      .verificationChecks
      .create({ to: phoneNumber, code: verificationCode })

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }
    return result
  }
}