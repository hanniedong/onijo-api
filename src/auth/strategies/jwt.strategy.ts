import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from '@users/entitites/user.entity';
import { UsersService } from '@users/users.service';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtSecret } from './auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    })
  }

  validate(validationPayload: { email: string, sub: string }): UserEntity | null {
    return this.usersService.getUserByEmail(validationPayload.email);
  }
}