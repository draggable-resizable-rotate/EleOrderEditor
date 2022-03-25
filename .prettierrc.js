module.exports = {
  // 关闭制表符缩进，而是用空格
  tabWidth: 2,
  singleQuote: true,
  // 不用在多行的逗号分隔的句法结构的最后一行的末尾加上逗号
  trailingComma: 'all',
  // 单行代码最大长度
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
};
