import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entitites/user.entity';
import { UsersResolver } from './users.resolver';
import { ProfileEntity } from 'src/user_profiles/entities/profile.entity';
import { SmsService } from 'src/sms/sms.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity]), SmsService],
  controllers: [],
  providers: [UsersService, UsersResolver, SmsService],
  exports: [UsersService],
})
export class UsersModule { }