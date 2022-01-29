module.exports = {
  cacheGroups: {
    // 把 node_modules 的代码放到一起，每次构建有缓存
    vendors: {
      name: 'chunk-vendors',
      test: /[\\/]node_modules[\\/]/,
      priority: -10,
      chunks: 'initial',
    },
    // 同步加载代码凡是使用到两次的，都分割
    common: {
      name: 'chunk-common',
      minChunks: 2,
      priority: -20,
      chunks: 'initial',
      // 和其它的不冲突
      reuseExistingChunk: true,
    },
  },
};
