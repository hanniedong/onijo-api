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
var ElasticSearchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticSearchService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@elastic/elasticsearch");
let ElasticSearchService = ElasticSearchService_1 = class ElasticSearchService {
    constructor() {
        this.logger = new common_1.Logger(ElasticSearchService_1.name);
        this.client = new elasticsearch_1.Client({
            node: process.env.ELASTIC_SEARCH_URL || 'http://localhost:9200',
            auth: {
                username: process.env.ELASTIC_SEARCH_USERNAME,
                password: process.env.ELASTIC_SEARCH_PASSWORD,
            },
        });
    }
    async deleteIndices(index) {
        try {
            await this.client.indices.delete({ index });
        }
        catch (e) {
            throw e;
        }
    }
    async createIndices(index, properties) {
        try {
            await this.client.indices.create({
                index: index,
            });
        }
        catch (e) {
            throw e;
        }
    }
    async bulkUpload(items, index) {
        const logger = this.logger;
        const ELASTIC_RETRY_COUNT = 3;
        const ELASTIC_RETRY_WAIT_IN_MS = 3000;
        const ELASTIC_CONCURRENCY_COUNT = 5;
        const ELASTIC_BODY_SIZE_IN_BYTES = 3000000;
        const ELASTIC_FLUSH_INTERVAL_IN_MS = 30000;
        try {
            return await this.client.helpers.bulk({
                datasource: items,
                retries: ELASTIC_RETRY_COUNT,
                wait: ELASTIC_RETRY_WAIT_IN_MS,
                concurrency: ELASTIC_CONCURRENCY_COUNT,
                flushBytes: ELASTIC_BODY_SIZE_IN_BYTES,
                flushInterval: ELASTIC_FLUSH_INTERVAL_IN_MS,
                refreshOnCompletion: true,
                onDocument(doc) {
                    return {
                        create: { _index: index, _id: doc.id },
                    };
                },
                onDrop(doc) {
                    var _a;
                    logger.log(`Document upload failed: ${(_a = doc === null || doc === void 0 ? void 0 : doc.error) === null || _a === void 0 ? void 0 : _a.reason}`);
                },
            });
        }
        catch (e) {
            throw e;
        }
    }
    async getStatsForIndex(index) {
        try {
            return await this.client.indices.stats({ index });
        }
        catch (e) {
            throw e;
        }
    }
    async search(params) {
        try {
            return await this.client.search(params);
        }
        catch (e) {
            throw e;
        }
    }
    async checkIndexExists(index) {
        try {
            return this.client.indices.exists({ index });
        }
        catch (e) {
            throw e;
        }
    }
    async upsertDocument(index, id, doc) {
        const body = {
            doc: Object.assign({}, doc),
            doc_as_upsert: true,
        };
        try {
            return await this.client.update({
                index,
                id,
                body,
            });
        }
        catch (e) {
            throw e;
        }
    }
    async deleteDocument(index, id) {
        try {
            const { body } = await this.client.exists({ index: index, id: id });
            if (body) {
                await this.client.delete({ index: index, id: id });
                return true;
            }
            return false;
        }
        catch (e) {
            throw e;
        }
    }
};
ElasticSearchService = ElasticSearchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ElasticSearchService);
exports.ElasticSearchService = ElasticSearchService;
//# sourceMappingURL=elastic-search.service.js.map