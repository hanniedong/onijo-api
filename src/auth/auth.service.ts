import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { comparePasswords } from '@utils/password.utils';

import { UsersService } from '../users/users.service';
import { jwtSecret } from './auth.constants';
import { UserInterface } from '../interfaces/user.interface';
import { LoginInterface } from 'src/interfaces/login.interface';
import { UserEntity } from 'src/database/entities/user.entity';
import PostgresErrorCode from 'src/database/postgresErrorCode.enum';
import RegisterDto from './dto/register.dto';
import { throwError } from 'rxjs';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.createUser({
        ...registrationData,
        password: hashedPassword
      });
      if (createdUser) {
        createdUser.password = undefined;
      }
      return createdUser;
    } catch (error) {
      throw (error)
    }
  }
}