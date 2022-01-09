import { Injectable } from '@nestjs/common';
import { ElasticSearchService } from 'src/elastic-search/elastic-search.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { COMMUNITIES_INDEX } from './communities.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommunitiesService {
  constructor(
    private readonly elasticSearchService: ElasticSearchService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getCommunities() {
    return this.httpService
      .get('https://api.us.amity.co/api/v3/communities', {
        headers: {
          'x-api-key': this.configService.get('AMITY_X_API_KEY'),
          Authorization: `Bearer ${this.configService.get(
            'AMITY_ACCESS_TOKEN',
          )}`,
        },
      })
      .pipe(map((response) => response));
  }

  public async searchCommunities(query): Promise<any> {
    const { body } = await this.elasticSearchService.search({
      index: COMMUNITIES_INDEX,
      body: {
        query: {
          multi_match: {
            query: query,
            fields: ['displayName', 'description'],
          },
        },
      },
    });
    const communities = body.hits.hits.map((result) => ({
      communityId: result._source.communityId,
      displayName: result._source.displayName,
      description: result._source.description,
      avatarFileId: result._source.avatarFileId,
      membersCount: result._source.membersCount,
    }));
    return communities;
  }

  async populateCommunitiesInElasticSearch(): Promise<any> {
    // communities
    const communities = await firstValueFrom(this.getCommunities());
    const { body: doesCommunitiesIndexExist } =
      await this.elasticSearchService.checkIndexExists(COMMUNITIES_INDEX);
    if (doesCommunitiesIndexExist) {
      await this.elasticSearchService.deleteIndices(COMMUNITIES_INDEX);
    }

    await this.elasticSearchService.createIndices(COMMUNITIES_INDEX, {
      id: { type: 'number' },
      uuid: { type: 'string' },
    });

    const communitiesData = communities.data.communities.map((community) => ({
      communityId: community._id,
      displayName: community.displayName,
      description: community.description,
      avatarFileId: community.avatarFileId,
      membersCount: community.membersCount,
    }));

    const communitiesUpload = await this.elasticSearchService.bulkUpload(
      communitiesData,
      COMMUNITIES_INDEX,
    );
    return communitiesUpload;
  }
}
