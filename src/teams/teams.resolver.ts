import { Resolver, Query } from "@nestjs/graphql";
import { TeamEntity } from "src/database/entities/team.entity";
import { TeamsService } from "./teams.service";

@Resolver()
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) { }

  @Query(() => [TeamEntity], { name: 'teams', nullable: true })
  async getTeams() {
    try {
      return await this.teamsService.getTeams();
    } catch (e) {
      console.log(e)
    }
  }
}