import { IsEmail } from 'class-validator';

export class CreateUserDto {
  username: string;

  password: string;

  @IsEmail()
  email: string;
}