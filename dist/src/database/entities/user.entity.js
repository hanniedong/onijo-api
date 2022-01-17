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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const profile_entity_1 = require("./profile.entity");
const file_entity_1 = require("./file.entity");
const user_team_metadata_entity_1 = require("./user-team-metadata.entity");
let UserEntity = class UserEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 300 }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, unique: true }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'phone_number' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamptz',
        name: 'password_last_updated_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "passwordLastUpdatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, name: 'is_phone_number_confirmed' }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isPhoneNumberConfirmed", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.OneToOne)(() => profile_entity_1.ProfileEntity),
    (0, typeorm_1.JoinColumn)({ name: 'profile_id' }),
    __metadata("design:type", profile_entity_1.ProfileEntity)
], UserEntity.prototype, "profile", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [user_team_metadata_entity_1.UserTeamMetadata], { nullable: 'items' }),
    (0, typeorm_1.OneToMany)((type) => user_team_metadata_entity_1.UserTeamMetadata, (userTeamMetadata) => userTeamMetadata.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "userTeamMetadata", void 0);
__decorate([
    (0, graphql_1.Field)(() => file_entity_1.File, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'avatar_id' }),
    (0, typeorm_1.OneToOne)(() => file_entity_1.File, { eager: true, nullable: true }),
    __metadata("design:type", file_entity_1.File)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('users'),
    (0, graphql_1.ObjectType)()
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map