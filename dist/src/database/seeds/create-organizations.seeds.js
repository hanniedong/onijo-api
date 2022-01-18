"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const organization_entity_1 = require("../entities/organization.entity");
class CreateOrganizations {
    async run(factory) {
        await factory(organization_entity_1.OrganizationEntity)().createMany(100);
    }
}
exports.default = CreateOrganizations;
//# sourceMappingURL=create-organizations.seeds.js.map