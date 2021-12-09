import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entitites/user.entity';
import { UsersResolver } from './users.resolver';
import { ProfileEntity } from 'src/user_profiles/entities/profile.entity';
import { SmsModule } from 'src/sms/sms.module';
import { FilesModule } from 'src/files/files.module';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity]), SmsModule, FilesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule { }