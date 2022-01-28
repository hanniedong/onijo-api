import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from '@users/users.service';
import { SmsService } from './sms.service';
import { SmsEntity } from './entity/sms.entity';
import { GetInitiatePhoneNumberVerificationArgs } from './dto/args/get-initiate-phone-number-verification.args';
import { GetConfirmPhoneNumberVerificationArgs } from './dto/args/get-confirm-phone-number-verification.args';
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class SmsResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly smsService: SmsService) { }

  @Mutation(() => SmsEntity,{ name: 'confirmPhoneNumberVerification', nullable: true })
  async confirmVerificationCode(@Args() getConfirmPhoneNumberVerificationArgs: GetConfirmPhoneNumberVerificationArgs) {
    const phoneNumber = getConfirmPhoneNumberVerificationArgs?.phoneNumber
    const verificationCode = getConfirmPhoneNumberVerificationArgs.verificationCode
    try {
      const user = await this.usersService.findUser({ phoneNumber })
      if (user) {
        await this.smsService.verifyPhoneNumber(phoneNumber, verificationCode)
      } else {
        throw new NotFoundException()
      }
    } catch (e) {
      throw e
    }
  }
  

  @Mutation(() => SmsEntity, { name: 'initiatePhoneNumberVerification', nullable: true })
  async initiatePhoneNumberConfirmation(@Args() getInitiatePhoneNumberVerificationArgs: GetInitiatePhoneNumberVerificationArgs) {
    const phoneNumber = getInitiatePhoneNumberVerificationArgs?.phoneNumber
    try {
      const user = await this.usersService.findUser({ phoneNumber })
      if (user) {
       const data = await this.smsService.initiatePhoneNumberVerification(phoneNumber)
       return data
      } else {
        throw new NotFoundException()
      }
    } catch (e) {
      throw e
    }
  }
}