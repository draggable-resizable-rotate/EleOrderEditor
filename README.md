# REACT CLI
自定义搭建的 REACT CLI

为什么不用 Create-React-App
- 不好深度定制化，需要 拓展的话需要 
  - 重新使用 script 包，而且这些包更新不及时，对新版本webpack支持不友好
  - npm run eject 多出很多文件夹，开发体验不好，而且config代码难以修改（需要你通读源码，内部封装的过于紧密）
- 去除无用配置，能加快webpack启动的速度
- 虽然是叫REACT CLI，但是只需要添加一些配置，立马能跑Vue的代码


## 拓展和修改Create-React-App
- 环境变量 PORT、HOST、BUILD_PATH、GENERATE_SOURCEMAP、IMAGE_INLINE_SIZE_LIMIT 保持原来的用法
- 环境变量 PUBLIC_PATH => HOME_PAGE，不过在html模板文件仍然是 %PUBLIC_PATH%
- 保留了 Create-React-App 通过加载环境变量文件 设置环境变量，在 appDir/config/env-config


## 有哪些内置的功能
- portfinder 帮助识别配置默认端口是否有效
- package.json 在 script 添加 webpack执行代码的时候 配置 --env mode=property，就会加载 appDir/config/webpack.property.config.js 配置
- appDir/config/.eslintrc.js 能够对 config 下的所有文件进行格式校验（默认为node），如果需要开启，请自动的安装好 vscode 的 eslint 插件

## log
- 环境变量文件加载成功
- 根据mode参数变量加载不同的 config 配置
- webpack-merge 合并 webpack 配置，只有预设环境变量值才能 合并 common 配置
- 添加 .eslintrc 到 config 目录下，统一代码风格
- 重写文件是否存在的判断逻辑，fs.accessSync
- 集成 webpack-dev-server ，添加在 development 环境的配置
- 集成portfinder，即使用户配置环境变量的PORT被占用，也能递增返回新的port
- webpack.config.js 导出的函数变成 async 函数，允许返回 config
- 接入 less 和 各种 css loader的 （post-css、style、extract）
- 完成jsx语法的识别
- 完成eslint在生产环境下的接入，预计开发环境不接入而是使用 husky + vscode-eslint-plugin

## todo
- 验证 post-css 是否确切有效
- 验证 jsx是否没有问题，把之前的代码复制过来看看
- 验证 路径别名
- 验证所有代码
- 验证webpack的所有功能是否有效
- 验证在外部配置文件是否能够合并
- 验证各个参见是否生效


## 成功
- 实测 在生产环境下 初次打包速度略快于 Create-React-App，在有缓存下更快
- 