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
exports.TeamEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const organization_entity_1 = require("./organization.entity");
const user_team_metadata_entity_1 = require("./user-team-metadata.entity");
let TeamEntity = class TeamEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], TeamEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'display_name' }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TeamEntity.prototype, "displayName", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_team_metadata_entity_1.UserTeamMetadata),
    (0, typeorm_1.OneToMany)((type) => user_team_metadata_entity_1.UserTeamMetadata, (userTeamMetadata) => userTeamMetadata.team),
    __metadata("design:type", user_team_metadata_entity_1.UserTeamMetadata)
], TeamEntity.prototype, "userTeamMetadata", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'organization_id' }),
    (0, graphql_1.Field)(),
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.OrganizationEntity, (organization) => organization.teams),
    __metadata("design:type", organization_entity_1.OrganizationEntity)
], TeamEntity.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", Date)
], TeamEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", Date)
], TeamEntity.prototype, "updatedAt", void 0);
TeamEntity = __decorate([
    (0, typeorm_1.Entity)('teams'),
    (0, graphql_1.ObjectType)()
], TeamEntity);
exports.TeamEntity = TeamEntity;
//# sourceMappingURL=team.entity.js.map