import * as Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import { OrganizationEntity } from '../entities/organization.entity'
import { File } from '../entities/file.entity'

define(OrganizationEntity, (faker: typeof Faker) => {
  const id = faker.uuid
  const displayName = faker.company.companyName()
  const leagues = ['NFL', 'NBA']
  const random = Math.floor(Math.random() * leagues.length);

  const organization = new OrganizationEntity()

  organization.id = id
  organization.displayName = displayName
  organization.league = leagues[random]
  organization.avatar = factory(File)() as any
  organization.createdAt = new Date()
  return organization
})