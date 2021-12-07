import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entitites/user.entity';
import { UsersResolver } from './users.resolver';
import { ProfileEntity } from 'src/user_profiles/entities/profile.entity';
import { TwilioService } from 'src/client/twilio/twilio.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity]), TwilioService],
  controllers: [],
  providers: [UsersService, UsersResolver, TwilioService],
  exports: [UsersService],
})
export class UsersModule { }