module.exports = {
  root: true,
  env: {
    es6: true,
    browser: false,
    node: true,
  },
  parserOptions: {
    parser: 'esm',
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true
    },
    sourceType: 'module',
  },
  extends: ['prettier', 'prettier/standard'],
  plugins: ['node', 'prettier'],
  // add your custom rules here
  rules: {
    // 'no-console': 0,
  },
};
