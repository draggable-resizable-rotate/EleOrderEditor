module.exports = {
  env: {
    commonjs: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'consistent-return': 0,
  },
  root: true,
};
