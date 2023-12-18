import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UsersService } from '@users/users.service';
import { LoginInterface } from 'src/interfaces/login.interface';
import { UserEntity } from '../database/entities/user.entity';
import { AuthService } from './auth.service';
import { GetUpdatePasswordArgs } from './dto/args/get-update-password.args';
import { AuthEntity } from './entities/auth.entity';
import { getLoginArgs } from './dto/args/get-login.args';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver(() => AuthEntity)
export class AuthResolver {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Mutation(()=> AuthEntity)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args() getLoginArgs: getLoginArgs,
    @Context() context,
    ): Promise<LoginInterface>{
    try {
      return await this.authService.login(context.user)
    } catch(e){
      throw e
    }
  }

  @Mutation(() => AuthEntity, { name: 'updatePassword', nullable: true })
  async updatePassword(@Args() getUpdatePasswordArgs: GetUpdatePasswordArgs): Promise<LoginInterface> {
    const phoneNumber = getUpdatePasswordArgs.phoneNumber
    const password = getUpdatePasswordArgs.password
    try{
      const user = await this.usersService.findUser({phoneNumber});
      if(user){
        await this.authService.updatePassword(password, user);
        return await this.authService.login(user)
      }
    }catch(e){
      throw e
    }
  }
}
