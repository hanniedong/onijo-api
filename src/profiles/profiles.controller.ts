import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';

import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProfilesService } from './profiles.service';
import { UpsertProfileDto } from './dto/upsert-profile.dto';
import { UsersService } from '@users/users.service';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly usersService: UsersService
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProfile(@Req() request: RequestWithUser, @Body() upsertProfileDto: UpsertProfileDto) {
    try {
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
      const profile = await this.profilesService.upsertProfile(upsertProfileDto, request.user.id);
      await this.usersService.addUserToElasticSearch(request.user.id)
    return profile
    } catch (e) {
      console.error(e)
      throw (e)
    }
  }
}