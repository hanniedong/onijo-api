import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '@users/users.service';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtSecret } from '../auth.constants';
import { UserInterface } from '../../interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    })
  }

  async validate(validationPayload: { email: string, sub: string }): Promise<UserInterface> | null {
    return await this.usersService.findUser({ email: validationPayload.email });
  }
}