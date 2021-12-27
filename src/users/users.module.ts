import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { UsersResolver } from './users.resolver';
import { ProfileEntity } from 'src/database/entities/profile.entity';
import { FilesModule } from 'src/files/files.module';
import { UsersController } from './users.controller';
import { File } from 'src/database/entities/file.entity';
import { UserTeamMetadata } from 'src/database/entities/user-team-metadata.entity';
import { TeamEntity } from 'src/database/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity, UserTeamMetadata, TeamEntity]), FilesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule { }