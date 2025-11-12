import { defineConfig, globalIgnores } from "eslint/config";
import nextConfig from "eslint-config-next";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-unresolved": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
]);

export default eslintConfig;
