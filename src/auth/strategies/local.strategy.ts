import { toUserDto } from "@mappers/user.mapper";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { comparePasswords } from "@utils/password.utils";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UserInterface } from "../interfaces/user.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<UserInterface> {
    const user = await this.authService.validate(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    comparePasswords(user.password, password)

    return toUserDto(user);
  }
}