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