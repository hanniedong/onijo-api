import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entitites/user.entity';
import { UsersResolver } from './users.resolver';
import { ProfileEntity } from 'src/user_profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  controllers: [],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule { }