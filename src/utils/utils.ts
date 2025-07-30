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
  },
  backText: {
    label: 'Back',
    value: 'backText',
    placeholder: 'Enter the answer or explanation...',
  },
  phoneticSpelling: {
    label: 'Phonetic Spelling',
    value: 'phoneticSpelling',
    placeholder: 'Enter the phonetic spelling...',
  },
  handwriting: {
    label: 'Handwritten Content',
    value: null,
    placeholder: null,
  },
};

export const cardFields = Object.values(cardFieldsObj);
