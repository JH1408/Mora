// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const baseImportOrder = {
  groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
  // Treat our alias as "internal"
  pathGroups: [
    { pattern: '@/**', group: 'internal', position: 'before' },
    {
      pattern: '{react,react-dom,next,next/**}',
      group: 'external',
      position: 'before',
    },
    { pattern: '@testing-library/**', group: 'external', position: 'after' },
    { pattern: 'vitest', group: 'external', position: 'after' },
  ],
  pathGroupsExcludedImportTypes: ['builtin'],
  'newlines-between': 'always',
  alphabetize: {
    order: 'asc',
    caseInsensitive: true,
  },
};

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: { project: ['./tsconfig.json'] },
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
      'import/internal-regex': '^@/(.*)$',
    },
    rules: {
      'import/order': ['error', baseImportOrder],
    },
  },
  // Ensure test files also adhere to the same ordering
  {
    files: ['**/__tests__/**/*.{ts,tsx}', '**/*.test.{ts,tsx}'],
    rules: {
      'import/order': ['error', baseImportOrder],
    },
  },
  ...storybook.configs['flat/recommended'],
];

export default eslintConfig;
