import { toUserDto } from "@mappers/user.mapper";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserInterface } from "src/interfaces/user.interface";
import { ProfileEntity } from "src/user_profiles/entities/profile.entity";
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from "./dto/user.dto";
import { UserEntity } from "./entitites/user.entity";
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
  ) { }

  async createUser(createUserData): Promise<UserEntity> {
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
    console.log(user)
    return await this.userRepo.save(user)
  }

  async findUser(options): Promise<UserEntity> {
    return await this.userRepo.findOne(options);
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