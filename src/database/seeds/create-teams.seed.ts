import { TeamEntity } from '../entities/team.entity'
import { Seeder, Factory } from 'typeorm-seeding'

export default class CreateTeams implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(TeamEntity)().createMany(100)
  }
}