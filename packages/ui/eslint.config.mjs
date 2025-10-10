import { config } from "@ephin-travel-kit/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**', './eslint.config.mjs'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
];
