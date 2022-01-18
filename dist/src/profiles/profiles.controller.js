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
exports.ProfilesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const profiles_service_1 = require("./profiles.service");
const upsert_profile_dto_1 = require("./dto/upsert-profile.dto");
const users_service_1 = require("../users/users.service");
let ProfilesController = class ProfilesController {
    constructor(profilesService, usersService) {
        this.profilesService = profilesService;
        this.usersService = usersService;
    }
    async createProfile(request, upsertProfileDto) {
        try {
            return await this.profilesService.upsertProfile(upsertProfileDto, request.user.id);
        }
        catch (e) {
            console.error(e);
            throw (e);
        }
    }
    async updateProfile(upsertProfileDto, request) {
        try {
            const profile = await this.profilesService.upsertProfile(upsertProfileDto, request.user.id);
            await this.usersService.addUserToElasticSearch(request.user.id);
            return profile;
        }
        catch (e) {
            console.error(e);
            throw (e);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_profile_dto_1.UpsertProfileDto]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "createProfile", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upsert_profile_dto_1.UpsertProfileDto, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "updateProfile", null);
ProfilesController = __decorate([
    (0, common_1.Controller)('profiles'),
    __metadata("design:paramtypes", [profiles_service_1.ProfilesService,
        users_service_1.UsersService])
], ProfilesController);
exports.ProfilesController = ProfilesController;
//# sourceMappingURL=profiles.controller.js.map