import { toUserDto } from '@mappers/user.mapper';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@users/entitites/user.entity';
import { comparePasswords } from '@utils/password.utils';

import { UsersService } from '../users/users.service';
import { jwtSecret } from './auth.constants';
import { UserInterface } from '../interfaces/user.interface';
import { LoginInterface } from 'src/interfaces/login.interface';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validate(email: string, password: string): Promise<UserEntity> | null {
    const user = await this.usersService.findUser({ email: email });

    if (!user) {
      return null;
    }

    const passwordIsValid = comparePasswords(password, user.password);
    return passwordIsValid ? user : null;
  }

  async login(user): Promise<LoginInterface> {
    const payload = {
      email: user.email,
      sub: user.id
    }

    return {
      accessToken: this.jwtService.sign(payload),
      username: user.username,
      id: user.id
    }
  }

  async verify(token: string): Promise<UserInterface> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret
    })

    const user = await this.usersService.findUser({ email: decoded.email });

    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }

    return user;
  }
}