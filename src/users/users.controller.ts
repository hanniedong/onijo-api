import { UsersService } from './users.service';
import { Body, Controller, ParseArrayPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import { Multer } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserTeamMetadataDto } from './dto/update-user-team-metadata.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async addAvatar(@Req() request: RequestWithUser, @UploadedFile() file: Multer.File) {
    return this.usersService.addAvatar(request.user.id, file.buffer, file.originalname);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto,) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (e) {
      console.error(e)
    }
  }

  @Patch('teams')
  @UseGuards(JwtAuthGuard)
  async updateUserTeamMetadata(@Body()
  UpdateUserTeamMetadataDto: UpdateUserTeamMetadataDto, @Req() request: RequestWithUser,) {
    try {
      Promise.all(UpdateUserTeamMetadataDto?.teams.map(async (updateUserTeamMetadataDto) => {
        console.log("HOIT")
        return await this.usersService.upsertUserTeamMetadata(updateUserTeamMetadataDto, request.user.id);
      }))
    } catch (e) {
      console.error(e)
    }
  }
}