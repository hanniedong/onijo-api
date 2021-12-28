import { Body, Req, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import { AuthService } from './auth.service';
import RequestWithUser from './interface/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guards/local-auth.guard';
import { LoginInterface } from 'src/interfaces/login.interface';
import { UserEntity } from 'src/database/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser): Promise<LoginInterface> {
    return await this.authService.login(req.user as UserEntity);
  }
}