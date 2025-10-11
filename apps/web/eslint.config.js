import { nextJsConfig } from '@ephin-travel-kit/eslint-config/next-js';
import { defineConfig } from 'eslint/config';

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  {
    extends: [nextJsConfig],
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['eslint.config.js'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
]);
