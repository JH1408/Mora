import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const cardFieldsObj = {
  frontText: {
    label: 'Front',
    value: 'frontText',
    placeholder: 'Enter the question or prompt...',
    isOptional: false,
  },
  backText: {
    label: 'Back',
    value: 'backText',
    placeholder: 'Enter the answer or explanation...',
    isOptional: false,
  },
  phoneticSpelling: {
    label: 'Phonetic Spelling',
    value: 'phoneticSpelling',
    placeholder: 'Enter the phonetic spelling...',
    isOptional: true,
  },
  handwriting: {
    label: 'Handwritten Content',
    value: null,
    placeholder: null,
    isOptional: true,
  },
  usageContext: {
    label: 'Usage Context',
    value: 'usageContext',
    placeholder: 'Enter context about how this word is used...',
    isOptional: true,
  },
};

export const cardFields = Object.values(cardFieldsObj);
