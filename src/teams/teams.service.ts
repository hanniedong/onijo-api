import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamEntity } from "src/database/entities/team.entity";

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepo: Repository<TeamEntity>,
  ) { }

  async getTeams(): Promise<Array<TeamEntity>> {
    return await this.teamRepo.find({ relations: ['organization'] });
  }
}