import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { ProfileEntity } from "src/database/entities/profile.entity";
import { ProfilesService } from "./profiles.service";
import { GetUserProfileArgs } from "./args/get-user-profile.args";

@Resolver(() => ProfileEntity)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) { }

  // @Query(() => ProfileEntity, { name: 'profile', nullable: true })
  // // @UseGuards(GqlAuthGuard)
  // async getUserProfile(@Args() getUserProfileArgs: GetUserProfileArgs): Promise<ProfileEntity> {
  //   console.log("GET")
  //   return await this.profilesService.getProfile(getUserProfileArgs);
  // }
}