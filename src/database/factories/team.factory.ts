import * as Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import { OrganizationEntity } from '../entities/organization.entity'
import { TeamEntity } from '../entities/team.entity'

define(TeamEntity, (faker: typeof Faker) => {
  const id = faker.uuid
  const displayName = faker.company.companyName()

  const team = new TeamEntity()

  team.id = id
  team.displayName = displayName
  team.organization = factory(OrganizationEntity)() as any
  return team
})