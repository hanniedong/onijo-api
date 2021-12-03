import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UserInterface } from "src/interfaces/user.interface";
import { CurrentUser } from "../auth/current-user.decorator";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { UserEntity } from "./entitites/user.entity";
import { GetUserArgs } from "./dto/args/get-user.args";
// import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user.input";
// import { DeleteUserInput } from "./dto/input/delete-user.input";
// import { UpdateUserInput } from "./dto/input/update-user.input";


import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { UpdateUsernameInput } from "./dto/input/update-username.input";

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
  async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<UserInterface> {
    return await this.usersService.createUser(createUserData);
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


  // @Mutation(() => User)
  // deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
  //   return this.usersService.deleteUser(deleteUserData);
}