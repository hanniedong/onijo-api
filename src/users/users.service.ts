import { toUserDto } from "@mappers/user.mapper";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from "src/auth/interfaces/user.interface";
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
  ) { }

  // public createUser(createUserData): UserEntity {
  //   const user: UserEntity = {
  //     userId: uuidv4(),
  //     ...createUserData
  //   }

  //   this.users.push(user);

  //   return user;
  // }

  // public updateUser(updateUserData): UserEntity {
  //   const user = this.users.find(user => user.id === updateUserData.userId);

  //   Object.assign(user, updateUserData);

  //   return user;
  // }

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