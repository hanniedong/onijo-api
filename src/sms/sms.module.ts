import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SmsService } from 'src/sms/sms.service';

@Module({
  providers: [ConfigService, SmsService],
  exports: [],
})
export class SmsModule { }