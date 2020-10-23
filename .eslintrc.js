module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'esm',
    ecmaVersion: 8,
    sourceType: 'module',
  },
  extends: ['plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    // 'no-console': 0,
  },
};
