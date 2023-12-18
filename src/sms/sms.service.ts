import { BadRequestException, Injectable } from '@nestjs/common';
import { TwilioClient } from 'nestjs-twilio';

@Injectable()
export class SmsService {
  constructor(private readonly twilioClient: TwilioClient) { }

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

  async initiatePhoneNumberVerification(phoneNumber) {
    const serviceId = process.env.TWILIO_SERVICE_ID;
    try {
      return await this.twilioClient.verify.services(serviceId).verifications.create({ to: '+15103661172', channel: 'sms' })
    } catch (e) {
      return e
    }
  }

  async verifyPhoneNumber(phoneNumber: string, verificationCode: string): Promise<{ valid: boolean }> {
    const serviceId = process.env.TWILIO_SERVICE_ID;

    const result = await this.twilioClient.verify.services(serviceId)
      .verificationChecks
      .create({ to: phoneNumber, code: verificationCode })

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }
    return result
  }
}