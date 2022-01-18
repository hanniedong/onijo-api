"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserDto = void 0;
const toUserDto = (data) => {
    const { id, email, uuid, phoneNumber } = data;
    let userDto = {
        id,
        uuid,
        email,
        phoneNumber
    };
    return userDto;
};
exports.toUserDto = toUserDto;
//# sourceMappingURL=user.mapper.js.map