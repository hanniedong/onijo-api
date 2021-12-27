import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';

import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProfilesService } from './profiles.service';
import { UpsertProfileDto } from './dto/upsert-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProfile(@Req() request: RequestWithUser, @Body() upsertProfileDto: UpsertProfileDto) {
    try {
      console.log(request.user)
      return await this.profilesService.upsertProfile(upsertProfileDto, request.user.id);
    } catch (e) {
      console.error(e)
      throw (e)
    }
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Body() upsertProfileDto: UpsertProfileDto, @Req() request: RequestWithUser) {
    try {
      return await this.profilesService.upsertProfile(upsertProfileDto, request.user.id);
    } catch (e) {
      console.error(e)
      throw (e)
    }
  }
}