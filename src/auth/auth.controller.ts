import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { UserEntity } from "@users/entitites/user.entity";
import { Request } from 'express';

import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): { access_token: string } {
    return this.authService.login(req.user as UserEntity);
  }
}