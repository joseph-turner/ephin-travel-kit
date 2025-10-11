import { nextJsConfig } from '@ephin-travel-kit/eslint-config/next-js';
import { defineConfig } from 'eslint/config';

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  {
    extends: nextJsConfig,
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
