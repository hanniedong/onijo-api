import { Module } from '@nestjs/common';
import { TwilioService } from 'src/client/twilio/twilio.service';

@Module({
  providers: [TwilioService],
  exports: [TwilioService],
})
export class TwilioModule { }