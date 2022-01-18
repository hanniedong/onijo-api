"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const organization_entity_1 = require("../entities/organization.entity");
const team_entity_1 = require("../entities/team.entity");
(0, typeorm_seeding_1.define)(team_entity_1.TeamEntity, (faker) => {
    const id = faker.uuid;
    const displayName = faker.company.companyName();
    const team = new team_entity_1.TeamEntity();
    team.id = id;
    team.displayName = displayName;
    team.organization = (0, typeorm_seeding_1.factory)(organization_entity_1.OrganizationEntity)();
    return team;
});
//# sourceMappingURL=team.factory.js.map