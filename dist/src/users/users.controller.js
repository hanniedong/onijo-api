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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("./users.service");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const requestWithUser_interface_1 = __importDefault(require("../auth/interface/requestWithUser.interface"));
const multer_1 = require("multer");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_create_dto_1 = require("./dto/user.create.dto");
const update_user_team_metadata_dto_1 = require("./dto/update-user-team-metadata.dto");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async addAvatar(request, file) {
        return this.usersService.addAvatar(request.user.id, file.buffer, file.originalname);
    }
    async createUser(createUserDto) {
        try {
            return await this.usersService.createUser(createUserDto);
        }
        catch (e) {
            throw e;
        }
    }
    async createUserTeamMetadata(UpdateUserTeamMetadataDto, request) {
        try {
            for (const team of UpdateUserTeamMetadataDto.teams) {
                await this.usersService.upsertUserTeamMetadata(team, request.user.id);
            }
            await this.usersService.addUserToElasticSearch(request.user.id);
        }
        catch (e) {
            console.error(e);
        }
    }
    async populateArticlesInElasticSearch() {
        try {
            return await this.usersService.populateUsersInElasticSearch();
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    (0, common_1.Post)('avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof multer_1.Multer !== "undefined" && multer_1.Multer.File) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addAvatar", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('teams'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_team_metadata_dto_1.UpdateUserTeamMetadataDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUserTeamMetadata", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: `Administration endpoint to seed or re-seed content. Deletes the named indexes (everything) in elastic and creates an index users with the elastic mapping.`,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '`Authorization`, `x-api-key` header missing',
    }),
    (0, common_1.Post)('populate_users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "populateArticlesInElasticSearch", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map