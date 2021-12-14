import { PrismaClient } from '@prisma/client';
import { monsters } from './lib/monster';
import { occupations } from './lib/occupation';

const prisma = new PrismaClient();
const main = async () => {
  await occupationSeeder();
  await monsterSeeder();
};

const occupationSeeder = async () => {
  for (const occupation of occupations) {
    await prisma.occupations.upsert({
      where: {
        name: occupation.name,
      },
      create: occupation,
      update: occupation,
    });
  }
};

const monsterSeeder = async () => {
  for (const monster of monsters) {
    await prisma.monsters.upsert({
      where: {
        id: monster.id,
      },

      create: {
        id: monster.id,
        name: monster.name,
        type: monster.type,
        story: monster.story,

        specie: {
          connectOrCreate: {
            where: {
              name: monster.specie.name,
            },

            create: monster.specie,
          },
        },
      },

      update: {
        id: monster.id,
        name: monster.name,
        type: monster.type,
        story: monster.story,
      },
    });
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
