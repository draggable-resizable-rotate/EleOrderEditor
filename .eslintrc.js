module.exports = {
  env: {
    // 让 eslintrc.js 支持 node
    node: true,
    browser: true,
    es2021: true
  },
  root: true,
  // 忽略那些文件
  ignorePatterns: [],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    // 接入 prettier 适配
    'prettier'
  ],
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  // 解决报错 => 需要设置react的版本
  settings: {
    react: {
      version: 'detect'
    }
  },
  // 接入 ts 的解析器
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 12,
    sourceType: 'module',
    // 需要注意这是不够的，需要支持 React 特殊语法
    ecmaFeatures: {
      jsx: true
    }
  },
  // 全局变量注入
  globals: {

  },
  // 自定义 rules
  rules: {
    'no-console': 'error',
    // 这条配置其实是默认的，但是写出来提醒一下，jsx-runtime 默认没有引入
    'react/react-in-jsx-scope': 'error',
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'jsx-quotes': ['error', 'prefer-double']
  },
}

