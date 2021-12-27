import { File } from '../entities/file.entity'
import { Seeder, Factory } from 'typeorm-seeding'

export default class CreateFiles implements Seeder {
  public async run(factory: Factory): Promise<void> {
    try {
      console.log(factory(File)())
      await factory(File)().createMany(100)
    } catch (e) {
      console.log(e)
    }
  }
}