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
import { VerifyUserPhoneNumberInput } from "./dto/input/verify-user-phone-number.input";
import { UserTeamMetadata } from "src/database/entities/user-team-metadata.entity";
import { UpdateUserTeamMetadataInput } from "./dto/input/update-user-team-metadata.input";

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

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

  @Mutation(() => UserTeamMetadata)
  async updateUserTeamMetadata(@Args('updateUserTeamMetadata') updateUserTeamMetadata: UpdateUserTeamMetadataInput): Promise<UserEntity> {
    return await this.usersService.updateUserTeamMetadata(updateUserTeamMetadata);
  }



  // @Mutation(() => User)
  // deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
  //   return this.usersService.deleteUser(deleteUserData);
}