"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunitiesService = void 0;
const common_1 = require("@nestjs/common");
const elastic_search_service_1 = require("../elastic-search/elastic-search.service");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const communities_constants_1 = require("./communities.constants");
const config_1 = require("@nestjs/config");
let CommunitiesService = class CommunitiesService {
    constructor(elasticSearchService, httpService, configService) {
        this.elasticSearchService = elasticSearchService;
        this.httpService = httpService;
        this.configService = configService;
    }
    getCommunities() {
        return this.httpService
            .get('https://api.us.amity.co/api/v3/communities', {
            headers: {
                'x-api-key': this.configService.get('AMITY_X_API_KEY'),
                Authorization: `Bearer ${this.configService.get('AMITY_ACCESS_TOKEN')}`,
            },
        })
            .pipe((0, operators_1.map)((response) => response));
    }
    async searchCommunities(query) {
        const { body } = await this.elasticSearchService.search({
            index: communities_constants_1.COMMUNITIES_INDEX,
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
    async getAllCommunities() {
        const { body } = await this.elasticSearchService.search({
            index: communities_constants_1.COMMUNITIES_INDEX,
            sort: ["displayName.keyword:asc"]
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
    async populateCommunitiesInElasticSearch() {
        const communities = await (0, rxjs_1.firstValueFrom)(this.getCommunities());
        const { body: doesCommunitiesIndexExist } = await this.elasticSearchService.checkIndexExists(communities_constants_1.COMMUNITIES_INDEX);
        if (doesCommunitiesIndexExist) {
            await this.elasticSearchService.deleteIndices(communities_constants_1.COMMUNITIES_INDEX);
        }
        await this.elasticSearchService.createIndices(communities_constants_1.COMMUNITIES_INDEX, {});
        console.log(communities.data.communities);
        const communitiesData = communities.data.communities.map((community) => ({
            id: community._id,
            communityId: community.communityId,
            displayName: community.displayName,
            description: community.description,
            avatarFileId: community.avatarFileId,
            membersCount: community.membersCount,
        }));
        const communitiesUpload = await this.elasticSearchService.bulkUpload(communitiesData, communities_constants_1.COMMUNITIES_INDEX);
        return communitiesUpload;
    }
};
CommunitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [elastic_search_service_1.ElasticSearchService, typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], CommunitiesService);
exports.CommunitiesService = CommunitiesService;
//# sourceMappingURL=communities.service.js.map