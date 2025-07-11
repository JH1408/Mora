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

export const getCountryCode = (languageCode: string) => {
  return languageToCountry[languageCode] || languageCode;
};
