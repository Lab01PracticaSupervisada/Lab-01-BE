// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import vitest from '@vitest/eslint-plugin';

export default defineConfig(
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage', '**/*.js', '*.mjs'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  perfectionist.configs['recommended-natural'],
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      ...vitest.configs.recommended.rules,
      '@typescript-eslint/unbound-method': 'off',
    },
  },
);
