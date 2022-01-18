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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_entity_1 = require("../database/entities/profile.entity");
const user_entity_1 = require("../database/entities/user.entity");
const files_service_1 = require("../files/files.service");
let ProfilesService = class ProfilesService {
    constructor(userRepo, userProfileRepo, filesService) {
        this.userRepo = userRepo;
        this.userProfileRepo = userProfileRepo;
        this.filesService = filesService;
    }
    async upsertProfile(profileData, userId) {
        const user = await this.userRepo.findOne(userId, {
            relations: ['profile'],
        });
        const profile = Object.assign(Object.assign({}, user.profile), profileData);
        await this.userProfileRepo.save(profile);
        user.profile = profile;
        return await this.userRepo.save(user);
    }
    async getProfile(args) {
        try {
            const { userId } = args;
            const user = await this.userRepo.findOne(userId, {
                relations: ['profile'],
            });
            if (user === null || user === void 0 ? void 0 : user.profile) {
                return user.profile;
            }
        }
        catch (e) {
            throw e;
        }
    }
    async addAvatar(userId, imageBuffer, filename) {
        const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
        const user = await this.userRepo.findOne(userId, {
            relations: ['profile'],
        });
        await this.userRepo.update(userId, Object.assign(Object.assign({}, user), { avatar }));
        return avatar;
    }
    async getProfiles(query) {
        return await this.userProfileRepo.find({
            where: { firstName: query },
        });
    }
};
ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(profile_entity_1.ProfileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        files_service_1.FilesService])
], ProfilesService);
exports.ProfilesService = ProfilesService;
//# sourceMappingURL=profiles.service.js.map