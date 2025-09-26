import baseConfig, { restrictEnvAccess } from "@ephin-travel-kit/eslint-config/base";
import nextjsConfig from "@ephin-travel-kit/eslint-config/nextjs";
import reactConfig from "@ephin-travel-kit/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
