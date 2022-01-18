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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_twilio_1 = require("nestjs-twilio");
let SmsService = class SmsService {
    constructor(twilioClient) {
        this.twilioClient = twilioClient;
    }
    async sendSMS() {
        try {
            return await this.twilioClient.messages.create({
                body: 'SMS Body, sent to the phone!',
                from: process.env.TWILIO_PHONE_NUMBER,
                to: '+15103661172',
            });
        }
        catch (e) {
            return e;
        }
    }
    async initiatePhoneNumberVerification(phoneNumber) {
        const serviceId = process.env.TWILIO_SERVICE_ID;
        try {
            return await this.twilioClient.verify.services(serviceId).verifications.create({ to: '+15103661172', channel: 'sms' });
        }
        catch (e) {
            return e;
        }
    }
    async confirmPhoneNumber(phoneNumber, verificationCode) {
        const serviceId = process.env.TWILIO_SERVICE_ID;
        const result = await this.twilioClient.verify.services(serviceId)
            .verificationChecks
            .create({ to: phoneNumber, code: verificationCode });
        if (!result.valid || result.status !== 'approved') {
            throw new common_1.BadRequestException('Wrong code provided');
        }
        return result;
    }
};
SmsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_twilio_1.InjectTwilio)()),
    __metadata("design:paramtypes", [Object])
], SmsService);
exports.SmsService = SmsService;
//# sourceMappingURL=sms.service.js.map