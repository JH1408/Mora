export const languageToCountry: Record<string, string> = {
  // Original 2-letter codes (backward compatibility)
  en: 'us', // English → United States (could also use 'gb' for UK)
  th: 'th', // Thai → Thailand
  ko: 'kr', // Korean → South Korea
  zh: 'cn', // Chinese → China
  ja: 'jp', // Japanese → Japan
  es: 'es', // Spanish → Spain (could also use 'mx' for Mexico)
  fr: 'fr', // French → France
  de: 'de', // German → Germany

  // More specific language-region codes
  'en-us': 'us', // US English
  'en-gb': 'gb', // UK English
  'en-au': 'au', // Australian English
  'en-ca': 'ca', // Canadian English
  'zh-cn': 'cn', // Simplified Chinese
  'zh-tw': 'tw', // Traditional Chinese
  'zh-hk': 'hk', // Hong Kong Chinese
  'es-es': 'es', // Spain Spanish
  'es-mx': 'mx', // Mexican Spanish
  'es-ar': 'ar', // Argentine Spanish
  'fr-fr': 'fr', // France French
  'fr-ca': 'ca', // Canadian French
  'fr-be': 'be', // Belgian French
  'de-de': 'de', // Germany German
  'de-at': 'at', // Austrian German
  'de-ch': 'ch', // Swiss German
  'pt-br': 'br', // Brazilian Portuguese
  'pt-pt': 'pt', // Portugal Portuguese
  'it-it': 'it', // Italian
  'ru-ru': 'ru', // Russian
  'ar-sa': 'sa', // Saudi Arabic
  'ar-eg': 'eg', // Egyptian Arabic
  'hi-in': 'in', // Hindi
  'ja-jp': 'jp', // Japanese
  'ko-kr': 'kr', // Korean
  'th-th': 'th', // Thai
};

export const scriptToFontClass: Record<string, string> = {
  thai: 'font-thai',
  chinese: 'font-chinese',
  hanzi: 'font-chinese',
  japanese: 'font-japanese',
  kanji: 'font-japanese',
  korean: 'font-korean',
  hangul: 'font-korean',
  arabic: 'font-arabic',
  devanagari: 'font-devanagari',
  hindi: 'font-devanagari',
  tamil: 'font-tamil',
  telugu: 'font-telugu',
  hebrew: 'font-hebrew',
  farsi: 'font-farsi',
  urdu: 'font-urdu',
  latin: 'font-latin',
  default: 'font-latin',
};

export const getCountryCode = (languageCode: string) => {
  // First try exact match
  if (languageToCountry[languageCode]) {
    return languageToCountry[languageCode];
  }

  // If no exact match, try to extract country from language-region format
  const parts = languageCode.split('-');
  if (parts.length === 2) {
    return parts[1].toLowerCase();
  }

  // Fallback to language code itself
  return languageCode;
};

export const scriptToDirection: Record<string, 'ltr' | 'rtl'> = {
  arabic: 'rtl',
  hebrew: 'rtl',
  farsi: 'rtl',
  urdu: 'rtl',
  thai: 'ltr',
  chinese: 'ltr',
  hanzi: 'ltr',
  japanese: 'ltr',
  kanji: 'ltr',
  korean: 'ltr',
  hangul: 'ltr',
  devanagari: 'ltr',
  hindi: 'ltr',
  tamil: 'ltr',
  telugu: 'ltr',
  latin: 'ltr',
  default: 'ltr',
};

export function getFontClass(script?: string | null): string {
  if (!script) return scriptToFontClass.default;
  return scriptToFontClass[script.toLowerCase()] || scriptToFontClass.default;
}

export function getTextDirection(script?: string | null): 'ltr' | 'rtl' {
  if (!script) return scriptToDirection.default;
  return scriptToDirection[script.toLowerCase()] || scriptToDirection.default;
}

export function getLanguageClasses(script?: string | null): {
  fontClass: string;
  directionClass: string;
} {
  return {
    fontClass: getFontClass(script),
    directionClass: getTextDirection(script),
  };
}
