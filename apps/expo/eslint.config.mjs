import baseConfig from "@ephin-travel-kit/eslint-config/base";
import reactConfig from "@ephin-travel-kit/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".expo/**", "expo-plugins/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
