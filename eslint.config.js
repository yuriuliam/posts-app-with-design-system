// @ts-check
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'

// @ts-expect-error This plugin does not yet correctly exports their types.
import drizzle from 'eslint-plugin-drizzle'
// @ts-expect-error This plugin does not yet correctly exports their types.
import pluginImport from 'eslint-plugin-import'
// @ts-expect-error This plugin does not yet correctly exports their types.
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

const configs = Object.freeze({
  app: tseslint.config({
    name: '@app/app',
    files: ['**/*.{cjs,mjs,js,jsx,ts,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  }),
  eslint: tseslint.config(eslint.configs.recommended, {
    name: '@app/eslint-js',
    rules: { 'no-useless-rename': 'error' },
  }),
  a11y: tseslint.config(compat.extends('plugin:jsx-a11y/recommended'), {
    name: '@app/jsx-a11y',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    plugins: { 'jsx-a11y': jsxA11Y },
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  }),
  drizzle: tseslint.config({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    plugins: { drizzle },
    rules: {
      'drizzle/enforce-delete-with-where': [
        'error',
        { drizzleObjectName: ['db', 'ctx.db'] },
      ],
      'drizzle/enforce-update-with-where': [
        'error',
        { drizzleObjectName: ['db', 'ctx.db'] },
      ],
    },
  }),
  import: tseslint.config(compat.extends('plugin:import/recommended'), {
    name: '@app/import',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    plugins: { import: pluginImport },
    rules: {
      'import/no-default-export': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: false },
          distinctGroup: true,
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling'],
            'index',
            'type',
            'unknown',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next', group: 'external', position: 'before' },
            { pattern: '@**/*', group: 'external', position: 'before' },
            { pattern: '~/**', group: 'internal', position: 'after' },
            { pattern: '#/**', group: 'unknown', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
        },
      ],
    },
  }),
  next: tseslint.config(compat.extends('next/core-web-vitals')),
  prettier: tseslint.config(prettier),
  tseslint: tseslint.config(
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
      name: '@app/tseslint',
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          project: 'tsconfig.json',
          tsconfigRootDir: '.',
        },
      },
      plugins: { '@typescript-eslint': tseslint.plugin },
    },
    {
      name: '@app/tseslint-rules',
      rules: {
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
        ],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: { attributes: false } },
        ],
      },
    },
  ),
})

export default tseslint.config(
  // Next Base
  configs.next,
  // Medium Priorities
  configs.a11y,
  configs.drizzle,
  configs.import,
  configs.prettier,
  configs.eslint,
  configs.tseslint,
  // High Priorities
  configs.app,
)
