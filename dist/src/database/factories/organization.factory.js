"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const organization_entity_1 = require("../entities/organization.entity");
const file_entity_1 = require("../entities/file.entity");
(0, typeorm_seeding_1.define)(organization_entity_1.OrganizationEntity, (faker) => {
    const id = faker.uuid;
    const displayName = faker.company.companyName();
    const leagues = ['NFL', 'NBA'];
    const random = Math.floor(Math.random() * leagues.length);
    const organization = new organization_entity_1.OrganizationEntity();
    organization.id = id;
    organization.displayName = displayName;
    organization.league = leagues[random];
    organization.avatar = (0, typeorm_seeding_1.factory)(file_entity_1.File)();
    organization.createdAt = new Date();
    return organization;
});
//# sourceMappingURL=organization.factory.js.map