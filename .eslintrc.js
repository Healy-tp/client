const OFF = 0;

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'import/no-dynamic-require': OFF,
    'no-use-before-define': OFF,
    "react/prop-types": OFF
  },
};
