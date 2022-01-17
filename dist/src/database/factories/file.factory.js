"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_entity_1 = require("../entities/file.entity");
const typeorm_seeding_1 = require("typeorm-seeding");
(0, typeorm_seeding_1.define)(file_entity_1.File, (faker) => {
    const id = faker.id;
    const url = faker.image.imageUrl();
    const key = faker.image.imageUrl();
    console.log(url);
    const file = new file_entity_1.File();
    file.url = url;
    file.key = key;
    file.createdAt = new Date();
    file.updatedAt = new Date();
    return file;
});
//# sourceMappingURL=file.factory.js.map