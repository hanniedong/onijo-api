import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { ProfileEntity } from 'src/database/entities/profile.entity';
import { FilesModule } from 'src/files/files.module';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity]), FilesModule, UsersModule],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfilesResolver],
  exports: [ProfilesService],
})
export class ProfilesModule { }