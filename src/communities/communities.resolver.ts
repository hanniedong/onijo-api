import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Community } from './entities/community.entity';
import { CommunitiesService } from './communities.service';
import { GetCommunitiesArgs } from './dto/args/get-communities.args';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => Community)
export class CommunitiesResolver {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Query(() => [Community], { name: 'searchCommunities', nullable: true })
  // @UseGuards(GqlAuthGuard)
  async searchCommunites(
    @Args() getCommunitiesArgs: GetCommunitiesArgs,
  ): Promise<Community[]> {
    const { query } = getCommunitiesArgs;
    try {
      return await this.communitiesService.searchCommunities(query);
    } catch (e) {
      throw e;
    }
  }

  @Query(() => [Community], { name: 'getCommunities', nullable: true })
  // @UseGuards(GqlAuthGuard)
  async getCommunities(): Promise<Community[]> {
    try {
      return await this.communitiesService.getAllCommunities();
    } catch (e) {
      throw e;
    }
  }
}
