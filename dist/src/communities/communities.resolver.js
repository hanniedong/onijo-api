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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunitiesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const community_entity_1 = require("./entities/community.entity");
const communities_service_1 = require("./communities.service");
const get_communities_args_1 = require("./dto/args/get-communities.args");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
let CommunitiesResolver = class CommunitiesResolver {
    constructor(communitiesService) {
        this.communitiesService = communitiesService;
    }
    async searchCommunites(getCommunitiesArgs) {
        const { query } = getCommunitiesArgs;
        try {
            return await this.communitiesService.searchCommunities(query);
        }
        catch (e) {
            throw e;
        }
    }
    async getCommunities() {
        try {
            return await this.communitiesService.getAllCommunities();
        }
        catch (e) {
            throw e;
        }
    }
};
__decorate([
    (0, graphql_1.Query)(() => [community_entity_1.Community], { name: 'searchCommunities', nullable: true }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_communities_args_1.GetCommunitiesArgs]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], CommunitiesResolver.prototype, "searchCommunites", null);
__decorate([
    (0, graphql_1.Query)(() => [community_entity_1.Community], { name: 'getCommunities', nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CommunitiesResolver.prototype, "getCommunities", null);
CommunitiesResolver = __decorate([
    (0, graphql_1.Resolver)(() => community_entity_1.Community),
    __metadata("design:paramtypes", [communities_service_1.CommunitiesService])
], CommunitiesResolver);
exports.CommunitiesResolver = CommunitiesResolver;
//# sourceMappingURL=communities.resolver.js.map