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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const file_entity_1 = require("../database/entities/file.entity");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
let FilesService = class FilesService {
    constructor(publicFilesRepository, configService) {
        this.publicFilesRepository = publicFilesRepository;
        this.configService = configService;
    }
    async uploadPublicFile(dataBuffer, filename) {
        const s3 = new aws_sdk_1.S3();
        const uploadResult = await s3.upload({
            Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Body: dataBuffer,
            Key: `${(0, uuid_1.v4)()}-${filename}`
        })
            .promise();
        const newFile = this.publicFilesRepository.create({
            key: uploadResult.Key,
            url: uploadResult.Location
        });
        await this.publicFilesRepository.save(newFile);
        return newFile;
    }
    async deletePublicFile(fileId) {
        const file = await this.publicFilesRepository.findOne({ id: fileId });
        const s3 = new aws_sdk_1.S3();
        await s3.deleteObject({
            Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Key: file.key,
        }).promise();
        await this.publicFilesRepository.delete(fileId);
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map