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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTeamMetadata = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("./user.entity");
const team_entity_1 = require("./team.entity");
let UserTeamMetadata = class UserTeamMetadata {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UserTeamMetadata.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true, name: 'year_joined' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UserTeamMetadata.prototype, "yearJoined", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true, name: 'year_ended' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UserTeamMetadata.prototype, "yearEnded", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.UserEntity, (user) => user.userTeamMetadata),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserTeamMetadata.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => team_entity_1.TeamEntity, { nullable: true }),
    (0, typeorm_1.ManyToOne)((type) => team_entity_1.TeamEntity, (team) => team.userTeamMetadata),
    (0, typeorm_1.JoinColumn)({ name: 'team_id', referencedColumnName: 'id' }),
    __metadata("design:type", team_entity_1.TeamEntity)
], UserTeamMetadata.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserTeamMetadata.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserTeamMetadata.prototype, "updatedAt", void 0);
UserTeamMetadata = __decorate([
    (0, typeorm_1.Entity)('user_team_metadata'),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Unique)('user_team_exists', ['user', 'team'])
], UserTeamMetadata);
exports.UserTeamMetadata = UserTeamMetadata;
//# sourceMappingURL=user-team-metadata.entity.js.map