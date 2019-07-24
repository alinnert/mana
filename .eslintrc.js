module.exports = {
  root: true,
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: { browser: true },
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2]
  }
}
