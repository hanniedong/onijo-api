import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@users/users.module';
import { UsersService } from '@users/users.service';
import { SmsService } from 'src/sms/sms.service';
import { SmsController } from './sms.controller';
import { SmsResolver } from './sms.resolver';

@Module({
  controllers: [SmsController],
  imports: [ConfigModule, UsersModule],
  providers: [SmsService, SmsResolver],
  exports: [SmsService],
})
export class SmsModule { }