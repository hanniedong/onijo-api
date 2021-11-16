import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    readonly username: string;
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}