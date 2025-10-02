import css from '@eslint/css';
import { tailwind4 } from 'tailwind-csstree';

export const cssConfig = [
  {
    files: ['**/*.css'],
    language: 'css/css',
    languageOptions: {
      customSyntax: tailwind4,
      tolerant: true,
    },
    plugins: { css },
    rules: {
      'css/no-empty-blocks': 'error',
    },
  },
];
