import { Factory, Seeder } from 'typeorm-seeding';
import { Occupation } from '../occupations/occupation';

export default class CreateOccupations implements Seeder {
  public async run(factory: Factory): Promise<any> {
    try {
      const occupationName = ['エンジニア', 'デザイナー'];
      for (let i = 0; i < occupationName.length; i++) {
        await factory(Occupation)().create({ name: occupationName[i] });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
