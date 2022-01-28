module.exports = {
  '/API': {
    target: 'https://www.baidu.com/request', // 代理的目标路径
    pathRewrite: {
      '^/api': '', // 把匹配到的部分替换成空字符
    },
  },
};
