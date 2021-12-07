import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class TwilioService {
  public constructor(@InjectTwilio() private readonly client: TwilioClient) { }

  async sendSMS() {
    try {
      return await this.client.messages.create({
        body: 'SMS Body, sent to the phone!',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+15103661172',
      });
    } catch (e) {
      return e;
    }
  }

  async sendVerificationCode(phoneNumber: string) {
    try {
      return await this.client.verify.services(process.env.TWILIO_SERVICE_ID).verifications.create({ to: phoneNumber, channel: 'sms' })
    } catch (e) {
      return e
    }
  }
}