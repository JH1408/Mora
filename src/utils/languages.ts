export const languageToCountry: Record<string, string> = {
  en: 'us', // English → United States (could also use 'gb' for UK)
  th: 'th', // Thai → Thailand
  ko: 'kr', // Korean → South Korea
  zh: 'cn', // Chinese → China
  ja: 'jp', // Japanese → Japan
  es: 'es', // Spanish → Spain (could also use 'mx' for Mexico)
  fr: 'fr', // French → France
  de: 'de', // German → Germany
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
  latin: 'font-latin',
  default: 'font-latin',
};

export const getCountryCode = (languageCode: string) => {
  return languageToCountry[languageCode] || languageCode;
};

export const scriptToDirection: Record<string, 'ltr' | 'rtl'> = {
  arabic: 'rtl',
  hebrew: 'rtl',
  urdu: 'rtl',
  farsi: 'rtl',
  thai: 'ltr',
  chinese: 'ltr',
  hanzi: 'ltr',
  japanese: 'ltr',
  kanji: 'ltr',
  korean: 'ltr',
  hangul: 'ltr',
  devanagari: 'ltr',
  hindi: 'ltr',
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
