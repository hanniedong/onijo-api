import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../graphql.schema';
import { UsersService } from '../users/users.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UsersService) { }

  // @Query('user')
  // async findOneById(
  //   @Args('id')
  //   id: string,
  // ): Promise<User> {
  //   return this.usersService.findOne({ id: id });
  // }
}