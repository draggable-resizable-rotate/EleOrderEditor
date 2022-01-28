module.exports = {
  env: {
    commonjs: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 1,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'consistent-return': 0,
  },
};
