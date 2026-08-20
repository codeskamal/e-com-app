import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import { globalIgnores } from "eslint/config";

/**
 * @param {{ next?: boolean }} options
 */
export default async function config(options = {}) {
  const configs = [
    globalIgnores(["node_modules", "dist", ".next", ".turbo"]),
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.strict,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat["jsx-runtime"],
    {
      settings: {
        react: {
          version: "detect",
        },
      },
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
        "no-console": "warn",
      },
    },
  ];

  if (options.next) {
    const mod = await import("eslint-config-next/core-web-vitals");
    const nextConfig = mod.default ?? mod;
    configs.push(...(Array.isArray(nextConfig) ? nextConfig : [nextConfig]));
  } else {
    configs.push(reactHooksPlugin.configs["recommended-latest"]);
  }

  return configs;
}
