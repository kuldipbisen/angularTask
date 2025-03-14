// @ts-check
import eslint from '@eslint/js';
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import stylistic from "@stylistic/eslint-plugin-js";

const config = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      stylistic.configs.all,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@stylistic/js/indent": ["error", 4], 
      "@stylistic/js/object-curly-spacing": ["error", "always"],
      "@stylistic/js/quotes": ["error", "double"],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);


console.log(config);

export default config;