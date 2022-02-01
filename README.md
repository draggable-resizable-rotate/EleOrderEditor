# REACT CLI
自定义搭建的 REACT CLI

为什么不用 Create-React-App
- 不好深度定制化，需要 拓展的话需要 
  - 重新使用 script 包，而且这些包更新不及时，对新版本webpack支持不友好
  - npm run eject 多出很多文件夹，开发体验不好，而且config代码难以修改（需要你通读源码，内部封装的过于紧密）
- 去除无用配置，能加快webpack启动的速度
- 虽然是叫REACT CLI，但是只需要添加一些配置，立马能跑Vue的代码

## todo
- 集成stylelint

## 成功
- 实测 在生产环境下 初次打包速度略快于 Create-React-App，在有缓存下更快
- 性能：
  - 生产环境下开启source-map需要设置 GENERATE_SOURCEMAP
  - HOME_PAGE 为 publicPath
  - 

- css
  - 实测 css-loader module 模式生成 代码一致
  - post-css 确切有效，postcss 外部 可以通过 .browserslistrc文件 | package.json 的 browserslist 修改
  - 集成less和sass预处理器
  - 环境变量 PORT、HOST、BUILD_PATH（输出路径）

- 路径别名 
  - webpack alias 已经生效，内置 @ 代表 'appPath'/src
  - tsconfig 已经配置对应的 path，能够自动提示

- plugins
  - 实测 DefinePlugin 提供环境变量成功
  - 添加 webpackbar 进度条插件
  - 添加 webpack-bundle-analyzer 分析代码，执行npm run analyze，打包并分析
  - CopyWebpackPlugin 将 public 代码复制到 打包目录下， html-loader 无需集成
  - HtmlWebpackPlugin 自动压缩 html代码

- polyfill
  - 接入 @babel/preset-env + core-js@3 + regenerator-runtime 设置 按需加载 polyfill
  - postcss 使用 预设 postcss-preset-env 并且内置 autoprefixer

- asset
   - image，通过 asset 类型资源处理，小于 IMAGE_INLINE_SIZE_LIMIT 就生成 inline
   - svg，通过 file-loader + @svgr/webpack 处理，可直接转换成 ReactComponent
   - fonts，通过 asset/resource 直接导出

- 工程化
  - dotenv 方式配置环境变量文件
  - eslint：，eslint 可以通过 外部 eslintrc 和 package.json 的 eslintConfig，如果你希望在build的时候关闭内部的eslint检查，需要设置环境变量 DISABLE_ESLINT_PLUGIN
  - typescript
  - git、.gitignore
  - editorconfig
  - husky, pre-commit => npm run lint
  - mock，'热更新' mock，请求的时候 API 携带 /mock/xxx 路径，你需要在 mock 文件夹下，创建 xxx.js文件
