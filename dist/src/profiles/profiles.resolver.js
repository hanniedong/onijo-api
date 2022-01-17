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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const profile_entity_1 = require("../database/entities/profile.entity");
const profiles_service_1 = require("./profiles.service");
const get_user_profile_args_1 = require("./args/get-user-profile.args");
let ProfilesResolver = class ProfilesResolver {
    constructor(profilesService) {
        this.profilesService = profilesService;
    }
    async getUserProfile(getUserProfileArgs) {
        return await this.profilesService.getProfile(getUserProfileArgs);
    }
};
__decorate([
    (0, graphql_1.Query)(() => profile_entity_1.ProfileEntity, { name: 'profile', nullable: true }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_profile_args_1.GetUserProfileArgs]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "getUserProfile", null);
ProfilesResolver = __decorate([
    (0, graphql_1.Resolver)(() => profile_entity_1.ProfileEntity),
    __metadata("design:paramtypes", [profiles_service_1.ProfilesService])
], ProfilesResolver);
exports.ProfilesResolver = ProfilesResolver;
//# sourceMappingURL=profiles.resolver.js.map