import { PrismaClient } from '@prisma/client';
import { occupations } from './lib/occupation';

const prisma = new PrismaClient();
async function main() {
  for (const occupation of occupations) {
    await prisma.occupations.upsert({
      where: {
        name: occupation.name,
      },
      create: occupation,
      update: occupation,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
