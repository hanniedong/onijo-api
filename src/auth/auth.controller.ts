import { Body, Req, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import { AuthService } from './auth.service';
import RequestWithUser from './interface/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}