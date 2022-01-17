import { Controller, Post } from '@nestjs/common';

import { ApiOperation } from '@nestjs/swagger';
import { CommunitiesService } from './communities.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  // TODO: add auth
  @ApiOperation({
    summary: `Administration endpoint to seed or re-seed content. Deletes the named indexes (everything) in elastic and creates an index users with the elastic mapping.`,
  })
  @Post('populate_communities')
  async populateArticlesInElasticSearch() {
    try {
      return await this.communitiesService.populateCommunitiesInElasticSearch();
    } catch (err) {
      throw err;
    }
  }
}
