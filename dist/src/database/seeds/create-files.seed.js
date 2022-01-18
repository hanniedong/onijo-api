"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_entity_1 = require("../entities/file.entity");
class CreateFiles {
    async run(factory) {
        try {
            console.log(factory(file_entity_1.File)());
            await factory(file_entity_1.File)().createMany(100);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = CreateFiles;
//# sourceMappingURL=create-files.seed.js.map