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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const team_entity_1 = require("../database/entities/team.entity");
const teams_service_1 = require("./teams.service");
let TeamsResolver = class TeamsResolver {
    constructor(teamsService) {
        this.teamsService = teamsService;
    }
    async getTeams() {
        try {
            return await this.teamsService.getTeams();
        }
        catch (e) {
            console.log(e);
        }
    }
};
__decorate([
    (0, graphql_1.Query)(() => [team_entity_1.TeamEntity], { name: 'teams', nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamsResolver.prototype, "getTeams", null);
TeamsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [teams_service_1.TeamsService])
], TeamsResolver);
exports.TeamsResolver = TeamsResolver;
//# sourceMappingURL=teams.resolver.js.map