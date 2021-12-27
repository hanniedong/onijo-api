import * as Faker from 'faker'
import { File } from '../entities/file.entity'
import { define } from 'typeorm-seeding'

define(File, (faker: typeof Faker) => {
  const id = faker.id
  const url = faker.image.imageUrl()
  const key = faker.image.imageUrl()
  console.log(url)
  const file = new File()
  file.url = url
  file.key = key
  file.createdAt = new Date()
  file.updatedAt = new Date()
  return file
})