"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const database_config_1 = require("./config/database.config");
const graphql_1 = require("@nestjs/graphql");
const nestjs_twilio_1 = require("nestjs-twilio");
const sms_module_1 = require("./sms/sms.module");
const teams_module_1 = require("./teams/teams.module");
const files_module_1 = require("./files/files.module");
const profiles_module_1 = require("./profiles/profiles.module");
const elastic_search_module_1 = require("./elastic-search/elastic-search.module");
const communities_module_1 = require("./communities/communities.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        imports: [
            communities_module_1.CommunitiesModule,
            elastic_search_module_1.ElasticSearchModule,
            config_1.ConfigModule.forRoot({ load: [database_config_1.getDatabaseConfig] }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            sms_module_1.SmsModule,
            files_module_1.FilesModule,
            teams_module_1.TeamsModule,
            profiles_module_1.ProfilesModule,
            typeorm_1.TypeOrmModule.forRoot((0, database_config_1.getDatabaseConfig)()),
            graphql_1.GraphQLModule.forRoot({
                installSubscriptionHandlers: true,
                autoSchemaFile: true,
                debug: true,
                playground: true,
                context: ({ req }) => ({
                    headers: req.headers,
                }),
            }),
            nestjs_twilio_1.TwilioModule.forRoot({
                accountSid: process.env.TWILIO_ACCOUNT_SID,
                authToken: process.env.TWILIO_AUTH_TOKEN,
            }),
        ],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map