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
exports.UsersResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const user_entity_1 = require("../database/entities/user.entity");
const get_user_args_1 = require("./dto/args/get-user.args");
const get_users_args_1 = require("./dto/args/get-users.args");
const users_service_1 = require("./users.service");
const user_team_metadata_entity_1 = require("../database/entities/user-team-metadata.entity");
const file_entity_1 = require("../database/entities/file.entity");
const get_user_avatar_args_1 = require("./dto/args/get-user-avatar.args");
const search_users_1 = require("./dto/args/search-users");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUser(getUserArgs) {
        return await this.usersService.findUser(getUserArgs);
    }
    async addUserToElasticSearch(getUserArgs) {
        console.log(await this.usersService.addUserToElasticSearch(getUserArgs));
        return await this.usersService.addUserToElasticSearch(getUserArgs);
    }
    async getUserAvatar(getUserAvatarArgs) {
        const user = await this.usersService.getUserAvatar(getUserAvatarArgs);
        return user.avatar;
    }
    async getUserTeams(getUserArgs) {
        try {
            const teams = await this.usersService.getUserTeamMetadata(getUserArgs);
            return teams;
        }
        catch (error) {
            throw error;
        }
    }
    async searchUsers(searchUsersArgs) {
        const { query } = searchUsersArgs;
        try {
            console.log(query);
            return await this.usersService.searchUsers(query);
        }
        catch (e) {
            throw e;
        }
    }
    async getUsers(getUsersArgs) {
        const { userIds } = getUsersArgs;
        try {
            return await this.usersService.getUsers(userIds);
        }
        catch (e) {
            throw e;
        }
    }
    async getAllUsers() {
        try {
            return await this.usersService.getAllUsers();
        }
        catch (e) {
            throw e;
        }
    }
};
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.UserEntity, { name: 'user', nullable: true }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_args_1.GetUserArgs]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.UserEntity, { name: 'addUserToElasticSearch', nullable: true }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_args_1.GetUserArgs]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "addUserToElasticSearch", null);
__decorate([
    (0, graphql_1.Query)(() => file_entity_1.File, { name: 'userAvatar', nullable: true }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_avatar_args_1.GetUserAvatarArgs]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUserAvatar", null);
__decorate([
    (0, graphql_1.Query)(() => [user_team_metadata_entity_1.UserTeamMetadata], { name: 'userTeamMetadata', nullable: true }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_args_1.GetUserArgs]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUserTeams", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.UserEntity], { name: 'searchUsers', nullable: true }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_users_1.SearchUsersArgs]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "searchUsers", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.UserEntity], { name: 'getUsersByIds', nullable: true }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_users_args_1.GetUsersArgs]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUsers", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.UserEntity], { name: 'getUsers', nullable: true }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getAllUsers", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.UserEntity),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map