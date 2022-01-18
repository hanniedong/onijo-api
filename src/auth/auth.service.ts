import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { jwtSecret } from './auth.constants';
import { UserInterface } from '../interfaces/user.interface';
import { LoginInterface } from 'src/interfaces/login.interface';
import { UserEntity } from 'src/database/entities/user.entity';
import * as bcrypt from 'bcryptjs'

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
    const passwordIsValid = await bcrypt.compare(password, user.password);
    return passwordIsValid ? user : null;
  }

  async login(user): Promise<LoginInterface> {
    const payload = {
      email: user.email,
      sub: user.id
    }
    
    return {
      token: this.jwtService.sign(payload),
      username: user.username,
      id: user.id,
      uuid: user.uuid
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