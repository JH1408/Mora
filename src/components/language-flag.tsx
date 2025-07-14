import Image from 'next/image';

import { getCountryCode } from '@/utils/languages';

const LanguageFlag = ({
  languageCode,
  size = 20,
}: {
  languageCode: string;
  size?: number;
}) => {
  const countryCode = getCountryCode(languageCode);
  return (
    <Image
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`${countryCode} flag`}
      width={size}
      height={size * 0.75}
      className='inline-block'
    />
  );
};

export default LanguageFlag;
