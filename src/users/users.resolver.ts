import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UserInterface } from "src/interfaces/user.interface";
import { CurrentUser } from "../auth/current-user.decorator";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { UserEntity } from "../database/entities/user.entity";
import { GetUserArgs } from "./dto/args/get-user.args";
// import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user.input";
// import { DeleteUserInput } from "./dto/input/delete-user.input";
// import { UpdateUserInput } from "./dto/input/update-user.input";


import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { UpdateUsernameInput } from "./dto/input/update-username.input";
import { CreateUserProfileInput } from "./dto/input/create-userprofile.input";
import { UpdateUserProfileInput } from "./dto/input/update-userprofile.input";
import { SmsService } from "src/sms/sms.service";
import { VerifyUserPhoneNumberInput } from "./dto/input/verify-user-phone-number.input";

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService, private readonly smsService: SmsService) { }

  @Query(() => UserEntity, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<UserInterface> {
    return await this.usersService.findUser(getUserArgs);
  }

  // @Query(() => [User], { name: 'users', nullable: 'items' })
  // getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
  //   return this.usersService.getUsers(getUsersArgs);
  // }

  @Mutation(() => UserEntity)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    const { phoneNumber } = createUserData
    const user = await this.usersService.createUser(createUserData) || await this.usersService.findUser({ phoneNumber })
    const data = await this.smsService.initiatePhoneNumberVerification(phoneNumber)
    console.log(data)
    return user
  }

  @Mutation(() => UserEntity)
  async verifyUserPhoneNumber(@Args('verifyUserPhoneNumberData') verifyUserPhoneNumberData: VerifyUserPhoneNumberInput): Promise<UserEntity> {
    const { verificationCode, phoneNumber } = verifyUserPhoneNumberData
    const result = await this.smsService.confirmPhoneNumber(phoneNumber, verificationCode)
    return result.valid && await this.usersService.updateUserPhoneNumberConfirmation(verifyUserPhoneNumberData);
  }

  @Mutation(() => UserEntity)
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): Promise<UserEntity> {
    return await this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => UserEntity)
  async updateUsername(@Args('updateUsernameData') updateUsernameData: UpdateUsernameInput): Promise<UserEntity> {
    console.log("HIT")
    return await this.usersService.updateUsername(updateUsernameData);
  }

  @Mutation(() => UserEntity)
  async createUserProfile(@Args('createUserProfileData') createUserProfileData: CreateUserProfileInput): Promise<UserEntity> {
    return await this.usersService.createUserProfile(createUserProfileData);
  }

  @Mutation(() => UserEntity)
  async updateUserProfile(@Args('updateUserProfileData') updateUserProfileData: UpdateUserProfileInput): Promise<UserEntity> {
    return await this.usersService.updateUserProfile(updateUserProfileData);
  }


  // @Mutation(() => User)
  // deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
  //   return this.usersService.deleteUser(deleteUserData);
}