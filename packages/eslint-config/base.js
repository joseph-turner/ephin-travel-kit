import eslint from "@eslint/js";
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import globals from "globals";
import perfectionist from 'eslint-plugin-perfectionist';
import security from 'eslint-plugin-security';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = defineConfig([
  {
    ignores: ["dist/**", '.next/**', 'node_modules/**'],
  },
  {
    extends: [
      eslint.configs.recommended,
      eslintConfigPrettier,
      perfectionist.configs['recommended-natural'],
      tseslint.configs.recommended,
      security.configs.recommended,
      prettierRecommended,
      sonarjs.configs.recommended,
    ],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: 'module',
    },
    plugins: {
      turbo: turboPlugin,
      onlyWarn,
    },
    rules: {
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-restricted-imports": "error",
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
]);
