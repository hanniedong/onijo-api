import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProfileEntity } from 'src/database/entities/profile.entity';
import { UserEntity } from '../database/entities/user.entity';
import { FilesService } from 'src/files/files.service';
import { GetUserProfileArgs } from './args/get-user-profile.args';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly userProfileRepo: Repository<ProfileEntity>,
    private readonly filesService: FilesService,
  ) { }

  async upsertProfile(profileData, userId) {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['profile'] });

    const profile: ProfileEntity = {
      ...user.profile,
      ...profileData,
    };
    await this.userProfileRepo.save(profile);

    user.profile = profile;
    return await this.userRepo.save(user);
  }

  async getProfile(args: GetUserProfileArgs): Promise<ProfileEntity> {
    try {
      const { userId } = args;
      const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['profile'] });

      if (user?.profile) {
        return user.profile;
      }
    } catch (e) {
      throw e;
    }
  }

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['profile'] });


    await this.userRepo.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }

  public async getProfiles(query): Promise<ProfileEntity[]> {
    return await this.userProfileRepo.find({
      where: { firstName: query },
    });
  }
}
