import { Factory, Seeder } from 'typeorm-seeding';
import { Occupation } from '../occupations/occupation';

export default class CreateOccupations implements Seeder {
  public async run(factory: Factory): Promise<any> {
    try {
      const occupationName = [
        '株式会社HAL',
        '株式会社TAoSK',
        '株式会社未来創造展',
      ];
      for (let i = 0; i < 3; i++) {
        await factory(Occupation)().create({ name: occupationName[i] });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
