
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UserInterface } from "../../interfaces/user.interface";
import { toUserDto } from "@mappers/user.mapper";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<UserInterface> {
    console.log(email, password)
    const user = await this.authService.validate(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return toUserDto(user);
  }
}