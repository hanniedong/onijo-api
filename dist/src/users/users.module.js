"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const users_resolver_1 = require("./users.resolver");
const profile_entity_1 = require("../database/entities/profile.entity");
const files_module_1 = require("../files/files.module");
const users_controller_1 = require("./users.controller");
const user_team_metadata_entity_1 = require("../database/entities/user-team-metadata.entity");
const team_entity_1 = require("../database/entities/team.entity");
const elastic_search_module_1 = require("../elastic-search/elastic-search.module");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserEntity,
                profile_entity_1.ProfileEntity,
                user_team_metadata_entity_1.UserTeamMetadata,
                team_entity_1.TeamEntity,
            ]),
            files_module_1.FilesModule,
            elastic_search_module_1.ElasticSearchModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, users_resolver_1.UsersResolver],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map