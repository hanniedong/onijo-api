import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserInterface } from 'src/interfaces/user.interface';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UserEntity } from '../database/entities/user.entity';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
// import { GetUsersArgs } from "./dto/args/get-users.args";
// import { DeleteUserInput } from "./dto/input/delete-user.input";
// import { UpdateUserInput } from "./dto/input/update-user.input";

import { UsersService } from './users.service';
import { UserTeamMetadata } from 'src/database/entities/user-team-metadata.entity';
import { File } from 'src/database/entities/file.entity';
import { GetUserAvatarArgs } from './dto/args/get-user-avatar.args';
import { SearchUsersArgs } from './dto/args/search-users';
import { ProfileEntity } from 'src/database/entities/profile.entity';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserEntity, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<UserInterface> {
    return await this.usersService.findUser(getUserArgs);
  }

  @Query(() => File, { name: 'userAvatar', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUserAvatar(
    @Args() getUserAvatarArgs: GetUserAvatarArgs,
  ): Promise<any> {
    const user = await this.usersService.getUserAvatar(getUserAvatarArgs);
    return user.avatar;
  }

  @Query(() => [UserTeamMetadata], { name: 'userTeamMetadata', nullable: true })
  // @UseGuards(GqlAuthGuard)
  async getUserTeams(@Args() getUserArgs: GetUserArgs): Promise<any> {
    try {
      const teams = await this.usersService.getUserTeamMetadata(getUserArgs);
      return teams;
    } catch (error) {
      throw error;
    }
  }

  @Query(() => [UserEntity], { name: 'searchUsers', nullable: true })
  // @UseGuards(GqlAuthGuard)
  async searchUsers(@Args() searchUsersArgs: SearchUsersArgs): Promise<UserEntity[]> {
    const { query } = searchUsersArgs;
    try {
      console.log(query)
      return await this.usersService.searchUsers(query);
    } catch (e) {
      throw e;
    }
  }

  @Query(() => [UserEntity], { name: 'getUsersByIds', nullable: true })
  // @UseGuards(GqlAuthGuard)
  async getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<UserEntity[]> {
    const { userIds } = getUsersArgs;
    try {
      return await this.usersService.getUsers(userIds);
    } catch (e) {
      throw e;
    }
  }

  @Query(() => [UserEntity], { name: 'getUsers', nullable: true })
  // @UseGuards(GqlAuthGuard)
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.usersService.getAllUsers();
    } catch (e) {
      throw e;
    }
  }
  // @Query(() => [User], { name: 'users', nullable: 'items' })
  // getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
  //   return this.usersService.getUsers(getUsersArgs);
  // }

  // @Mutation(() => User)
  // deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
  //   return this.usersService.deleteUser(deleteUserData);
}
