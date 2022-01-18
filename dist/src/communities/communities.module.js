"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunitiesModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const elastic_search_module_1 = require("../elastic-search/elastic-search.module");
const communities_controller_1 = require("./communities.controller");
const communities_resolver_1 = require("./communities.resolver");
const communities_service_1 = require("./communities.service");
let CommunitiesModule = class CommunitiesModule {
};
CommunitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            elastic_search_module_1.ElasticSearchModule,
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
        ],
        controllers: [communities_controller_1.CommunitiesController],
        providers: [communities_service_1.CommunitiesService, communities_resolver_1.CommunitiesResolver],
        exports: [communities_service_1.CommunitiesService],
    })
], CommunitiesModule);
exports.CommunitiesModule = CommunitiesModule;
//# sourceMappingURL=communities.module.js.map