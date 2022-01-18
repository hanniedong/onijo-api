"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const profile_entity_1 = require("../database/entities/profile.entity");
const user_entity_1 = require("../database/entities/user.entity");
const files_service_1 = require("../files/files.service");
const user_team_metadata_entity_1 = require("../database/entities/user-team-metadata.entity");
const team_entity_1 = require("../database/entities/team.entity");
const elastic_search_service_1 = require("../elastic-search/elastic-search.service");
const users_constants_1 = require("./users.constants");
let UsersService = class UsersService {
    constructor(userRepo, userTeamMetadataRepo, teamRepo, profileRepo, filesService, elasticSearchService) {
        this.userRepo = userRepo;
        this.userTeamMetadataRepo = userTeamMetadataRepo;
        this.teamRepo = teamRepo;
        this.profileRepo = profileRepo;
        this.filesService = filesService;
        this.elasticSearchService = elasticSearchService;
    }
    async createUser(createUserData) {
        const user = Object.assign({ uuid: (0, uuid_1.v4)() }, createUserData);
        const hashedPassword = await bcrypt.hash(createUserData.password, 10);
        user.password = hashedPassword;
        try {
            return await this.userRepo.save(user);
        }
        catch (e) {
            if (e.code === '23505') {
                throw new common_1.BadRequestException('User already created. Please login.');
            }
            console.log(`Error creating user. Error: ${e}`);
        }
    }
    async updateUserPhoneNumberConfirmation(userId) {
        await this.userRepo.update(userId, { isPhoneNumberConfirmed: true });
        return await this.userRepo.findOne(userId);
    }
    async upsertUserTeamMetadata(updateUserTeamMetadata, userId) {
        try {
            const user = await this.findUser(userId);
            const team = await this.teamRepo.findOne(updateUserTeamMetadata.teamId);
            const userTeamMetadata = Object.assign({}, updateUserTeamMetadata);
            userTeamMetadata.user = user;
            userTeamMetadata.team = team;
            return await this.userTeamMetadataRepo.save(userTeamMetadata);
        }
        catch (e) {
            if (e.code === '23505') {
                const existingUserTeamMetadata = await this.userTeamMetadataRepo.findOne({
                    where: { user: userId, team: updateUserTeamMetadata.teamId },
                });
                const userTeamMetadata = Object.assign({}, existingUserTeamMetadata);
                userTeamMetadata.yearEnded = updateUserTeamMetadata.yearEnded;
                userTeamMetadata.yearJoined = updateUserTeamMetadata.yearJoined;
                return await this.userTeamMetadataRepo.save(userTeamMetadata);
            }
            else {
                throw e;
            }
        }
    }
    async getUserTeamMetadata(args) {
        const { id } = args;
        return await this.userTeamMetadataRepo.find({
            where: { user: id },
            relations: ['team', 'team.organization'],
        });
    }
    async findUser(options) {
        const user = await this.userRepo.findOne(options, { relations: [
                'profile',
                'userTeamMetadata',
                'userTeamMetadata.team',
                'userTeamMetadata.team.organization',
            ], });
        return user;
    }
    async addUserToElasticSearch(args) {
        try {
            const user = await this.userRepo.findOne(args, { relations: [
                    'profile',
                    'userTeamMetadata',
                    'userTeamMetadata.team',
                    'userTeamMetadata.team.organization',
                ], });
            const userData = {
                id: user.id,
                uuid: user.uuid,
                avatar: user.avatar,
                profile: user.profile,
                userTeamMetadata: user.userTeamMetadata,
            };
            return await this.elasticSearchService.upsertDocument(users_constants_1.USERS_INDEX, user.id, userData);
        }
        catch (e) {
            throw e;
        }
    }
    async getUserAvatar(userAvatarArgs) {
        return await this.userRepo.findOne({ where: userAvatarArgs });
    }
    async addAvatar(userId, imageBuffer, filename) {
        const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
        const user = await this.findUser(userId);
        await this.userRepo.update(userId, Object.assign(Object.assign({}, user), { avatar }));
        return avatar;
    }
    async searchUsers(query) {
        const { body } = await this.elasticSearchService.search({
            index: users_constants_1.USERS_INDEX,
            body: {
                query: {
                    multi_match: {
                        query: query,
                        fields: [
                            'profile.firstName.keyword',
                            'profile.lastName.keyword',
                            'userTeamMetadata.team.displayName.keyword',
                            'profile.job.keyword',
                            'profile.company.keyword',
                        ],
                    },
                },
            },
        });
        const users = body.hits.hits.map((result) => ({
            id: result._source.id,
            uuid: result._source.uuid,
            avatar: result._source.avatar,
            profile: result._source.profile,
            userTeamMetadata: result._source.userTeamMetadata,
        }));
        return users;
    }
    async getUsers(userIds) {
        const { body } = await this.elasticSearchService.search({
            index: users_constants_1.USERS_INDEX,
            body: {
                query: {
                    bool: {
                        must: {
                            terms: {
                                "uuid.keyword": userIds
                            }
                        }
                    }
                },
            },
        });
        const users = body.hits.hits.map((result) => ({
            id: result._source.id,
            uuid: result._source.uuid,
            avatar: result._source.avatar,
            profile: result._source.profile,
            userTeamMetadata: result._source.userTeamMetadata,
        }));
        return users;
    }
    async getAllUsers() {
        const { body } = await this.elasticSearchService.search({
            index: users_constants_1.USERS_INDEX,
            sort: ["profile.firstName.keyword:asc"]
        });
        const users = body.hits.hits.map((result) => ({
            id: result._source.id,
            uuid: result._source.uuid,
            avatar: result._source.avatar,
            profile: result._source.profile,
            userTeamMetadata: result._source.userTeamMetadata,
        }));
        return users;
    }
    async populateUsersInElasticSearch() {
        const users = await this.userRepo.find({
            relations: [
                'profile',
                'userTeamMetadata',
                'userTeamMetadata.team',
                'userTeamMetadata.team.organization',
            ],
        });
        const { body: doesUserIndexExist } = await this.elasticSearchService.checkIndexExists(users_constants_1.USERS_INDEX);
        if (doesUserIndexExist) {
            await this.elasticSearchService.deleteIndices(users_constants_1.USERS_INDEX);
        }
        const usersData = users.map((user) => ({
            id: user.id,
            uuid: user.uuid,
            avatar: user.avatar,
            profile: user.profile,
            userTeamMetadata: user.userTeamMetadata,
        }));
        await this.elasticSearchService.createIndices(users_constants_1.USERS_INDEX, {});
        const usersBulkUpload = await this.elasticSearchService.bulkUpload(usersData, users_constants_1.USERS_INDEX);
        return usersBulkUpload;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_team_metadata_entity_1.UserTeamMetadata)),
    __param(2, (0, typeorm_1.InjectRepository)(team_entity_1.TeamEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(profile_entity_1.ProfileEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, files_service_1.FilesService,
        elastic_search_service_1.ElasticSearchService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map