import { define } from 'typeorm-seeding';
import { Occupation } from '../occupations/occupation';
define(Occupation, () => {
  const occupation = new Occupation();
  return occupation;
});
