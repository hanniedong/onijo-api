import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from '@users/users.service';
import { LoginInterface } from 'src/interfaces/login.interface';
import { UserEntity } from '../database/entities/user.entity';
import { AuthService } from './auth.service';
import { GetUpdatePasswordArgs } from './dto/args/get-update-password.args';
import { AuthEntity } from './entities/auth.entity';

@Resolver(() => AuthEntity)
export class AuthResolver {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

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
