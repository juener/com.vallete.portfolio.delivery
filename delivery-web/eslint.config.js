import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintPluginImport from 'eslint-plugin-import' // Plugin para ordenação dos imports
import tailwindcss from 'eslint-plugin-tailwindcss' // Plugin para ordenação das classes Tailwind

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': eslintPluginImport, 
      'tailwindcss': tailwindcss, // npm install eslint-plugin-tailwindcss --save-dev
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "no-unused-vars": "warn",
      "no-undef": "error", 
      "quotes": ["error", "single"], 
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": ["off", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_", "ignoreRestSiblings": true }],
      'react-refresh/only-export-components': 'off',
      'react/react-in-jsx-scope': 'off',

      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          'newlines-between': 'always',
          'alphabetize': { order: 'asc', caseInsensitive: true },
        },
      ],

      'tailwindcss/classnames-order': 'warn',
    },
  },
)
