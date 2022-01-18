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
exports.OrganizationEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const file_entity_1 = require("./file.entity");
const team_entity_1 = require("./team.entity");
let OrganizationEntity = class OrganizationEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], OrganizationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'display_name' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], OrganizationEntity.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], OrganizationEntity.prototype, "league", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'avatar_id' }),
    (0, graphql_1.Field)(),
    (0, typeorm_1.OneToOne)(() => file_entity_1.File, {
        eager: true,
        nullable: true
    }),
    __metadata("design:type", file_entity_1.File)
], OrganizationEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_entity_1.TeamEntity, team => team.organization),
    __metadata("design:type", Array)
], OrganizationEntity.prototype, "teams", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", Date)
], OrganizationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", Date)
], OrganizationEntity.prototype, "updatedAt", void 0);
OrganizationEntity = __decorate([
    (0, typeorm_1.Entity)('organizations'),
    (0, graphql_1.ObjectType)()
], OrganizationEntity);
exports.OrganizationEntity = OrganizationEntity;
//# sourceMappingURL=organization.entity.js.map