import { toUserDto } from "@mappers/user.mapper";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SmsService } from "src/sms/sms.service";
import { UserInterface } from "src/interfaces/user.interface";
import { ProfileEntity } from "src/database/entities/profile.entity";
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from "./dto/user.dto";
import { UserEntity } from "../database/entities/user.entity";
import { FilesService } from "src/files/files.service";
import { UserTeamMetadata } from "src/database/entities/user-team-metadata.entity";
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
    @InjectRepository(ProfileEntity)
    private readonly userProfileRepo: Repository<ProfileEntity>,
    @InjectRepository(UserTeamMetadata)
    private readonly userTeamMetadataRepo: Repository<UserTeamMetadata>,
    private readonly filesService: FilesService
  ) { }

  async createUser(createUserData) {
    const user: UserEntity = {
      uuid: uuidv4(),
      ...createUserData
    }
    const hashedPassword = await bcrypt.hash(createUserData.password, 10);
    user.password = hashedPassword
    try {
      return await this.userRepo.save(user);
    } catch (e) {
      console.log(`Error creating user. Error: ${e}`)
    }
  }

  async updateUserPhoneNumberConfirmation(userId): Promise<UserEntity> {
    try {
      await this.userRepo.update(userId, { isPhoneNumberConfirmed: true });
      return await this.userRepo.findOne(userId)
    } catch (e) {
      console.log(`Error updating user. Error: ${e}`)
    }
  }

  async updateUserProfile(updateUserProfileData, userId): Promise<UserEntity> {
    const user = await this.userRepo.findOne(userId, { relations: ['profile'] })
    const profile: ProfileEntity = {
      ...user.profile,
      ...updateUserProfileData
    }
    await this.userProfileRepo.save(profile)

    user.profile = profile
    return await this.userRepo.save(user)
  }

  async updateUserTeamMetadata(updateUserTeamMetadata): Promise<UserEntity> {
    const { userId } = updateUserTeamMetadata
    const user = await this.userRepo.findOne(userId, { relations: ['userTeamMetadata'] })
    console.log(user)
    const userTeamMetadata: UserTeamMetadata = {
      ...user.userTeamMetadata,
      ...updateUserTeamMetadata
    }

    await this.userTeamMetadataRepo.save(userTeamMetadata)

    user.userTeamMetadata = userTeamMetadata
    return await this.userRepo.save(user)
  }


  async findUser(options): Promise<UserEntity> {
    return await this.userRepo.findOne(options);
  }

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
    const user = await this.findUser(userId);
    await this.userRepo.update(userId, {
      ...user,
      avatar
    });
    return avatar;
  }

  // public getUsers(getUsersArgs): UserEntity[] {
  //   return getUsersArgs.userIds.map(userId => this.getUser({ userId }));
  // }

  // public deleteUser(deleteUserData): UserEntity {
  //   const userIndex = this.users.findIndex(user => user.id === deleteUserData.userId);

  //   const user = this.users[userIndex];

  //   this.users.splice(userIndex);

  //   return user;
  // }
}