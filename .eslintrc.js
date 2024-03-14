module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  // settings: {
  //   react: {
  //     version: 'detect',
  //   },
  // },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    strings: 'off',
    quotes: ['error', 'single'],
    'no-unused-vars': 'error',
    'no-trailing-spaces': 'warn',
    'no-undef': 'error',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
