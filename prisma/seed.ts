import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed languages
  const languages = [
    { code: 'en', name: 'English', script: 'latin' },
    { code: 'th', name: 'Thai', script: 'thai' },
    { code: 'ko', name: 'Korean', script: 'hangul' },
    { code: 'zh', name: 'Chinese', script: 'hanzi' },
    { code: 'ja', name: 'Japanese', script: 'kanji' },
    { code: 'es', name: 'Spanish', script: 'latin' },
    { code: 'fr', name: 'French', script: 'latin' },
    { code: 'de', name: 'German', script: 'latin' },
  ];

  for (const language of languages) {
    await prisma.language.upsert({
      where: { code: language.code },
      update: {},
      create: language,
    });
  }

  console.log('Languages seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
