import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProfileEntity } from 'src/database/entities/profile.entity';
import { ProfilesService } from './profiles.service';
import { GetUserProfileArgs } from './args/get-user-profile.args';

@Resolver(() => ProfileEntity)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Query(() => ProfileEntity, { name: 'profile', nullable: true })
  async getUserProfile(
    @Args() getUserProfileArgs: GetUserProfileArgs,
  ): Promise<ProfileEntity> {
    return await this.profilesService.getProfile(getUserProfileArgs);
  }
}
