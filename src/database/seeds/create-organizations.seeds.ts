import { OrganizationEntity } from '../entities/organization.entity'
import { Seeder, Factory } from 'typeorm-seeding'

export default class CreateOrganizations implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(OrganizationEntity)().createMany(100)
  }
}