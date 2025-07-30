import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed languages
  const languages = [
    // English variants
    { code: 'en-us', name: 'English (US)', script: 'latin' },
    { code: 'en-gb', name: 'English (UK)', script: 'latin' },
    { code: 'en-au', name: 'English (Australia)', script: 'latin' },
    { code: 'en-ca', name: 'English (Canada)', script: 'latin' },

    // Spanish variants
    { code: 'es-es', name: 'Spanish (Spain)', script: 'latin' },
    { code: 'es-mx', name: 'Spanish (Mexico)', script: 'latin' },

    // French variants
    { code: 'fr-fr', name: 'French (France)', script: 'latin' },
    { code: 'fr-ca', name: 'French (Canada)', script: 'latin' },
    { code: 'fr-be', name: 'French (Belgium)', script: 'latin' },

    // German variants
    { code: 'de-de', name: 'German (Germany)', script: 'latin' },
    { code: 'de-at', name: 'German (Austria)', script: 'latin' },
    { code: 'de-ch', name: 'German (Switzerland)', script: 'latin' },

    // Portuguese variants
    { code: 'pt-br', name: 'Portuguese (Brazil)', script: 'latin' },
    { code: 'pt-pt', name: 'Portuguese (Portugal)', script: 'latin' },

    // Italian
    { code: 'it-it', name: 'Italian', script: 'latin' },

    // Russian
    { code: 'ru-ru', name: 'Russian', script: 'latin' },

    // Arabic variants
    {
      code: 'ar-sa',
      name: 'Arabic (Saudi Arabia)',
      script: 'arabic',
      rtl: true,
    },

    // Asian languages
    { code: 'th-th', name: 'Thai', script: 'thai' },
    { code: 'ko-kr', name: 'Korean', script: 'hangul' },
    { code: 'zh-cn', name: 'Chinese (Simplified)', script: 'hanzi' },
    { code: 'zh-tw', name: 'Chinese (Traditional)', script: 'hanzi' },
    { code: 'zh-hk', name: 'Chinese (Hong Kong)', script: 'hanzi' },
    { code: 'ja-jp', name: 'Japanese', script: 'kanji' },

    // Indian languages
    { code: 'hi-in', name: 'Hindi', script: 'devanagari' },
    { code: 'bn-in', name: 'Bengali', script: 'devanagari' },
    { code: 'ta-in', name: 'Tamil', script: 'tamil' },
    { code: 'te-in', name: 'Telugu', script: 'telugu' },

    // Other European languages
    { code: 'nl-nl', name: 'Dutch', script: 'latin' },
    { code: 'sv-se', name: 'Swedish', script: 'latin' },
    { code: 'no-no', name: 'Norwegian', script: 'latin' },
    { code: 'da-dk', name: 'Danish', script: 'latin' },
    { code: 'fi-fi', name: 'Finnish', script: 'latin' },
    { code: 'pl-pl', name: 'Polish', script: 'latin' },
    { code: 'cs-cz', name: 'Czech', script: 'latin' },
    { code: 'sk-sk', name: 'Slovak', script: 'latin' },
    { code: 'hu-hu', name: 'Hungarian', script: 'latin' },
    { code: 'ro-ro', name: 'Romanian', script: 'latin' },
    { code: 'bg-bg', name: 'Bulgarian', script: 'latin' },
    { code: 'hr-hr', name: 'Croatian', script: 'latin' },
    { code: 'sr-rs', name: 'Serbian', script: 'latin' },
    { code: 'sl-si', name: 'Slovenian', script: 'latin' },
    { code: 'et-ee', name: 'Estonian', script: 'latin' },
    { code: 'lv-lv', name: 'Latvian', script: 'latin' },
    { code: 'lt-lt', name: 'Lithuanian', script: 'latin' },

    // Other languages
    { code: 'tr-tr', name: 'Turkish', script: 'latin' },
    { code: 'he-il', name: 'Hebrew', script: 'hebrew', rtl: true },
    { code: 'fa-ir', name: 'Persian', script: 'farsi', rtl: true },
    { code: 'ur-pk', name: 'Urdu', script: 'urdu', rtl: true },
    { code: 'vi-vn', name: 'Vietnamese', script: 'latin' },
    { code: 'id-id', name: 'Indonesian', script: 'latin' },
    { code: 'ms-my', name: 'Malay', script: 'latin' },
    { code: 'fil-ph', name: 'Filipino', script: 'latin' },
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
