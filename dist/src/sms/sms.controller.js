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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsController = void 0;
const common_1 = require("@nestjs/common");
const sms_service_1 = require("./sms.service");
const initate_phone_number_verification_dto_1 = require("./dto/initate-phone-number-verification.dto");
const requestWithUser_interface_1 = __importDefault(require("../auth/interface/requestWithUser.interface"));
const verification_code_dto_1 = require("./dto/verification-code.dto");
const users_service_1 = require("../users/users.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SmsController = class SmsController {
    constructor(smsService, usersService) {
        this.smsService = smsService;
        this.usersService = usersService;
    }
    async initiatePhoneNumberVerification(phoneNumber, request) {
        try {
            console.log(request);
            if (request.user.isPhoneNumberConfirmed) {
                throw new common_1.BadRequestException('Phone number already confirmed');
            }
            return this.smsService.initiatePhoneNumberVerification(phoneNumber);
        }
        catch (e) {
            console.error(e);
        }
    }
    async confirmPhoneNumber(verificationCodeDto, request) {
        try {
            const userId = request.user.id;
            const { phoneNumber, verificationCode } = verificationCodeDto;
            const phoneNumberConfirmation = await this.smsService.confirmPhoneNumber(phoneNumber, verificationCode);
            if (phoneNumberConfirmation === null || phoneNumberConfirmation === void 0 ? void 0 : phoneNumberConfirmation.valid) {
                await this.usersService.updateUserPhoneNumberConfirmation(userId);
            }
            return phoneNumberConfirmation;
        }
        catch (e) {
            console.error(e);
        }
    }
};
__decorate([
    (0, common_1.Post)('initiate-verification'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [initate_phone_number_verification_dto_1.InitiatePhoneNumberVerificationDto, Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], SmsController.prototype, "initiatePhoneNumberVerification", null);
__decorate([
    (0, common_1.Post)('confirm-verification'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verification_code_dto_1.VerificationCodeDto, Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], SmsController.prototype, "confirmPhoneNumber", null);
SmsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('sms'),
    __metadata("design:paramtypes", [sms_service_1.SmsService, users_service_1.UsersService])
], SmsController);
exports.SmsController = SmsController;
//# sourceMappingURL=sms.controller.js.map