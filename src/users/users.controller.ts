import { UsersService } from './users.service';
import {
  Body,
  Controller,
  ParseArrayPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import { Multer } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserTeamMetadataDto } from './dto/update-user-team-metadata.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Multer.File,
  ) {
    return this.usersService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (e) {
      throw e;
    }
  }

  @Post('teams')
  @UseGuards(JwtAuthGuard)
  async createUserTeamMetadata(
    @Body()
    UpdateUserTeamMetadataDto: UpdateUserTeamMetadataDto,
    @Req() request: RequestWithUser,
  ) {
    try {
      for (const team of UpdateUserTeamMetadataDto.teams) {
        await this.usersService.upsertUserTeamMetadata(team, request.user.id);
      }
    } catch (e) {
      console.error(e);
    }
  }

  @ApiOperation({
    summary: `Administration endpoint to seed or re-seed content. Deletes the named indexes (everything) in elastic and creates an index users with the elastic mapping.`,
  })
  @ApiResponse({
    status: 401,
    description: '`Authorization`, `x-api-key` header missing',
  })
  @Post('populate_users')
  async populateArticlesInElasticSearch() {
    try {
      return await this.usersService.populateUsersInElasticSearch();
    } catch (err) {
      throw err;
    }
  }
}
