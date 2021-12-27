import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProfileEntity } from "src/database/entities/profile.entity";
import { UserEntity } from "../database/entities/user.entity";
import { FilesService } from "src/files/files.service";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly userProfileRepo: Repository<ProfileEntity>,
    private readonly filesService: FilesService
  ) { }

  async upsertProfile(createProfileData, userId) {
    const user = await this.userRepo.findOne(userId, { relations: ['profile'] })

    const profile: ProfileEntity = {
      ...user.profile,
      ...createProfileData
    }
    await this.userProfileRepo.save(profile)

    user.profile = profile
    return await this.userRepo.save(user)
  }


  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
    const user = await this.userRepo.findOne(userId, { relations: ['profile'] })
    await this.userRepo.update(userId, {
      ...user,
      avatar
    });
    return avatar;
  }

}