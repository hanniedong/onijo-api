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
exports.ProfileEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let ProfileEntity = class ProfileEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar', name: 'first_name' }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar', name: 'last_name' }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "birthday", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "job", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "company", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "study", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "education", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'team_status' }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "teamStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'mentorship_role' }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "mentorshipRole", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ProfileEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ProfileEntity.prototype, "updatedAt", void 0);
ProfileEntity = __decorate([
    (0, typeorm_1.Entity)('user_profiles'),
    (0, graphql_1.ObjectType)()
], ProfileEntity);
exports.ProfileEntity = ProfileEntity;
//# sourceMappingURL=profile.entity.js.map