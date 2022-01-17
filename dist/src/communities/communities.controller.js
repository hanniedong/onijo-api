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
exports.CommunitiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const communities_service_1 = require("./communities.service");
let CommunitiesController = class CommunitiesController {
    constructor(communitiesService) {
        this.communitiesService = communitiesService;
    }
    async populateArticlesInElasticSearch() {
        try {
            return await this.communitiesService.populateCommunitiesInElasticSearch();
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: `Administration endpoint to seed or re-seed content. Deletes the named indexes (everything) in elastic and creates an index users with the elastic mapping.`,
    }),
    (0, common_1.Post)('populate_communities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommunitiesController.prototype, "populateArticlesInElasticSearch", null);
CommunitiesController = __decorate([
    (0, common_1.Controller)('communities'),
    __metadata("design:paramtypes", [communities_service_1.CommunitiesService])
], CommunitiesController);
exports.CommunitiesController = CommunitiesController;
//# sourceMappingURL=communities.controller.js.map