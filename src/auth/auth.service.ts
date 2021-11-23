import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@users/entitites/user.entity';

import { UsersService } from '../users/users.service';
import { jwtSecret } from './auth.constants';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  validate(email: string, password: string): UserEntity | null {
    const user = this.usersService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  login(user: UserEntity): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.id
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  verify(token: string): UserEntity {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret
    })

    const user = this.usersService.getUserByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }

    return user;
  }
}