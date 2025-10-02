import { cssConfig } from '@ephin-travel-kit/eslint-config/css';
import { nextJsConfig } from '@ephin-travel-kit/eslint-config/next-js';
import { defineConfig } from 'eslint/config';

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  {
    extends: [nextJsConfig],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
