import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from 'express';
import { UserEntity } from "src/database/entities/user.entity";
import { LoginInterface } from "src/interfaces/login.interface";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import RequestWithUser from "./interface/requestWithUser.interface";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser): Promise<LoginInterface> {
    return await this.authService.login(req.user as UserEntity);
  }
}