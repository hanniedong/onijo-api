"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const team_entity_1 = require("../entities/team.entity");
class CreateTeams {
    async run(factory) {
        await factory(team_entity_1.TeamEntity)().createMany(100);
    }
}
exports.default = CreateTeams;
//# sourceMappingURL=create-teams.seed.js.map