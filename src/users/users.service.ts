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
    private readonly filesService: FilesService
  ) { }

  async createUser(createUserData) {
    const user: UserEntity = {
      id: uuidv4(),
      ...createUserData
    }

    try {
      return await this.userRepo.save(user);
    } catch (e) {
      console.log(`Error creating user. Error: ${e}`)
    }
  }

  async updateUser(updateUserData): Promise<UserEntity> {
    const { id, email, password } = updateUserData
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userRepo.update(id, { email, password: hashedPassword });
      return await this.userRepo.findOne(id)
    } catch (e) {
      console.log(`Error updating user. Error: ${e}`)
    }
  }

  async updateUserPhoneNumberConfirmation(verifyUserPhoneNumberData): Promise<UserEntity> {
    const { userId } = verifyUserPhoneNumberData
    try {
      await this.userRepo.update(userId, { isPhoneNumberConfirmed: true });
      return await this.userRepo.findOne(userId)
    } catch (e) {
      console.log(`Error updating user. Error: ${e}`)
    }
  }

  async updateUsername(updateUsernameData): Promise<UserEntity> {
    const { id, username } = updateUsernameData
    try {
      await this.userRepo.update(id, { username });
      return await this.userRepo.findOne(id)
    } catch (e) {
      console.log(`Error updating user. Error: ${e}`)
    }
  }

  async createUserProfile(createUserProfileData): Promise<UserEntity> {
    const { userId } = createUserProfileData
    const user = await this.userRepo.findOne(userId)
    const profile: ProfileEntity = {
      ...createUserProfileData
    }
    await this.userProfileRepo.save(profile)

    user.profile = profile
    return await this.userRepo.save(user)
  }

  async updateUserProfile(updateUserProfileData): Promise<UserEntity> {
    const { userId } = updateUserProfileData
    const user = await this.userRepo.findOne(userId, { relations: ['profile'] })
    console.log(user)
    const profile: ProfileEntity = {
      ...user.profile,
      ...updateUserProfileData
    }
    await this.userProfileRepo.save(profile)

    user.profile = profile
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