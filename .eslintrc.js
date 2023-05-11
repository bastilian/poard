/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    semi: 'error',
    quotes: ['error', 'single'],
    'prettier/prettier': ['error', { singleQuote: true }],
    'react/prop-types': 'off',
  },
};
