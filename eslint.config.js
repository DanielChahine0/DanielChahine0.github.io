import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Allow certain lowercase helper imports that are used in JSX but may be
      // flagged by the linter (for example `motion` from framer-motion).
      // Ignore helper imports like `motion` and any variables that start with an
      // uppercase letter or underscore (commonly React components or intentionally
      // unused placeholders like `_var`). This reduces false positives.
      'no-unused-vars': ['error', { varsIgnorePattern: '^(motion|[A-Z_].*)' }],
    },
  },
])
