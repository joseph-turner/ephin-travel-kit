import { sanityConfig } from '@ephin-travel-kit/eslint-config/sanity';

/** @type {import("eslint").Linter.Config} */
export default [
  ...sanityConfig,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
