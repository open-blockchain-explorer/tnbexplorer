module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    env: {
      browser: true,
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', 'testing-library', '@typescript-eslint', 'prettier'],
  extends: [
    'react-app',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:testing-library/react',
    'plugin:testing-library/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  rules: {
    semi: ['error', 'always'],
    'no-undef': 'error',
    'no-func-assign': 'error',
    'no-unused-vars': 'error',
    'jsx-a11y/href-no-hash': 'off',
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-console': 2,
    strict: 0,
    ' no-case-declarations': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 0,
    ' react-hooks/exhaustive-deps': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
