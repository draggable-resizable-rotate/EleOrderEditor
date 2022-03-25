module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
    'stylelint-config-standard-scss',
    'stylelint-config-css-modules',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties'
  ],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
}

// stylelint-config-standard  css 标准语法要求
// stylelint-config-standard-scss scss 标准语法要求；stylelint 默认支持 less
// css-loader 在解析的时候是可以进行 css-modules 语法转换的， stylelint-config-css-modules 可以支持
// stylelint-order 样式的顺序，stylelint-config-idiomatic-order 是一个顺序组
// stylelint-config-prettier ，如果设置了 prettier ，需要设置这个插件
// standard-scss 会把 stylelint-config-css-modules 一些东西覆盖点，最好 css-modules 放在 standard-scss 后面
