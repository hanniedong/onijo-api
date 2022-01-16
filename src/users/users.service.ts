import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ProfileEntity } from 'src/database/entities/profile.entity';
import { UserEntity } from '../database/entities/user.entity';
import { FilesService } from 'src/files/files.service';
import { UserTeamMetadata } from 'src/database/entities/user-team-metadata.entity';
import { TeamEntity } from 'src/database/entities/team.entity';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUserAvatarArgs } from './dto/args/get-user-avatar.args';
// import { GetUserArgs } from "./dto/args/get-user.args";
// import { GetUsersArgs } from "./dto/args/get-users.args";
// import { CreateUserInput } from "./dto/input/create-user.input";
// import { DeleteUserInput } from "./dto/input/delete-user.input";
// import { UpdateUserInput } from "./dto/input/update-user.input";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserTeamMetadata)
    private readonly userTeamMetadataRepo: Repository<UserTeamMetadata>,
    @InjectRepository(TeamEntity)
    private readonly teamRepo: Repository<TeamEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepo: Repository<ProfileEntity>,
    private readonly filesService: FilesService,
  ) {}

  async createUser(createUserData) {
    const user: UserEntity = {
      uuid: uuidv4(),
      ...createUserData,
    };
    const hashedPassword = await bcrypt.hash(createUserData.password, 10);
    user.password = hashedPassword;
    try {
      return await this.userRepo.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new BadRequestException('User already created. Please login.');
      }
      console.log(`Error creating user. Error: ${e}`);
    }
  }

  async updateUserPhoneNumberConfirmation(userId): Promise<UserEntity> {
    await this.userRepo.update(userId, { isPhoneNumberConfirmed: true });
    return await this.userRepo.findOne(userId);
  }

  async upsertUserTeamMetadata(
    updateUserTeamMetadata,
    userId,
  ): Promise<UserTeamMetadata> {
    try {
      const user = await this.findUser(userId);
      const team = await this.teamRepo.findOne(updateUserTeamMetadata.teamId);

      const userTeamMetadata: UserTeamMetadata = {
        ...updateUserTeamMetadata,
      };
      userTeamMetadata.user = user;
      userTeamMetadata.team = team;
      return await this.userTeamMetadataRepo.save(userTeamMetadata);
    } catch (e) {
      if (e.code === '23505') {
        const existingUserTeamMetadata =
          await this.userTeamMetadataRepo.findOne({
            where: { user: userId, team: updateUserTeamMetadata.teamId },
          });
        const userTeamMetadata: UserTeamMetadata = {
          ...existingUserTeamMetadata,
        };
        userTeamMetadata.yearEnded = updateUserTeamMetadata.yearEnded;
        userTeamMetadata.yearJoined = updateUserTeamMetadata.yearJoined;
        return await this.userTeamMetadataRepo.save(userTeamMetadata);
      } else {
        throw e;
      }
    }
  }

  async getUserTeamMetadata(args: GetUserArgs): Promise<UserTeamMetadata[]> {
    const { id } = args;
    return await this.userTeamMetadataRepo.find({
      where: { user: id },
      relations: ['team', 'team.organization'],
    });
  }

  async findUser(options): Promise<any> {
    const user = await this.userRepo.findOne(options);
    return user;
  }

  async getUserAvatar(userAvatarArgs: GetUserAvatarArgs): Promise<any> {
    return await this.userRepo.findOne({ where: userAvatarArgs });
  }

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const user = await this.findUser(userId);
    await this.userRepo.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }

  public async getUsers(query): Promise<UserEntity[]> {
    console.log(query);
    return await this.userRepo.find({
      where: { profile: { firstName: query } },
      relations: ['profile', 'userTeamMetadata', 'userTeamMetadata.team'],
         join: {
        alias: "person",
        leftJoinAndSelect: {
            "homes": "person.homes",
            "homeType": "homes.homeType"
        }
    }
    });
  }

  // public deleteUser(deleteUserData): UserEntity {
  //   const userIndex = this.users.findIndex(user => user.id === deleteUserData.userId);

  //   const user = this.users[userIndex];

  //   this.users.splice(userIndex);

  //   return user;
  // }
}
