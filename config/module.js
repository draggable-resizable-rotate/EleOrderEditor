/* eslint-disable import/no-extraneous-dependencies */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const { EnvConfig, DependEnvConfig } = require('./utils/env');
const PathConfig = require('./utils/path');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;
// const sassRegex = /\.(scss|sass)$/
// const sassModuleRegex = /\.module\.(scss|sass)$/

const {
  hasJsxRuntime,
  shouldUseReactRefresh,
  isEnvProduction,
  isEnvDevelopment,
  imageInlineSizeLimit,
} = DependEnvConfig;

function getStyleLoaders(cssOptions) {
  const { GENERATE_SOURCEMAP } = EnvConfig;
  const shouldUseSourceMap = GENERATE_SOURCEMAP === 'true';

  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      // MiniCssExtractPlugin 能够为 css-loader 处理过得 各种引入文件，添加 publicPath
      options: { publicPath: '../../' },
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        ...cssOptions,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          ident: 'postcss',
          config: false,
          plugins: [
            'postcss-flexbugs-fixes',
            // postcss-preset-env 直接的支持 autoprefixer能力 
            /** post-css配置文件(https://github.com/browserslist/browserslist#browserslistrc)：
             *  1. .browserslistrc
             *  2. browserslist
             */
            [
              'postcss-preset-env',
              {
                // autoprefixer-options(https://github.com/postcss/autoprefixer#options)
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
            'postcss-normalize',
          ],
        },
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
      },
    },
  ].filter(Boolean);

  return loaders;
}

module.exports = {
  strictExportPresence: true,
  rules: [
    // 能够提取匹配到的第三方模块的source-map，无论是文件或者链接或者内联模式都可
    {
      enforce: 'pre',
      exclude: /@babel(?:\/|\\{1,2})runtime/,
      test: /\.(js|jsx|ts|tsx|css)$/,
      loader: require.resolve('source-map-loader'),
    },
    {
      oneOf: [
        {
          test: [/\.avif$/],
          type: 'asset',
          mimetype: 'image/avif',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
          generator: {
            filename: 'static/media/avif/[name].[hash].[ext]',
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
          generator: {
            filename: 'static/media/image/[name].[hash].[ext]',
          },
        },
        // {
        //   test: /\.svg$/,
        //   use: [
        //     {
        //       loader: require.resolve('@svgr/webpack'),
        //       options: {
        //         prettier: false,
        //         svgo: false,
        //         svgoConfig: {
        //           plugins: [{ removeViewBox: false }]
        //         },
        //         titleProp: true,
        //         ref: true
        //       }
        //     },
        //     {
        //       loader: require.resolve('file-loader'),
        //       options: {
        //         name: 'static/media/[name].[hash].[ext]'
        //       }
        //     }
        //   ],
        //   issuer: {
        //     and: [/\.(ts|tsx|js|jsx|md|mdx)$/]
        //   }
        // },
        // 这里得装很多插件  添加package.json
        // @babel/core, babel-loader babel-preset-react-app babel-plugin-named-asset-import
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: PathConfig.appSrc,
          loader: require.resolve('babel-loader'),
          options: {
            // 其实只是用到了一个 babel-preset-react-app 插件
            // 需要注意，这是官方维护的一个插件，并没有使用 babel 官网的 preset-react
            customize: require.resolve(
              'babel-preset-react-app/webpack-overrides',
            ),
            presets: [
              [
                require.resolve('babel-preset-react-app'),
                {
                  runtime: hasJsxRuntime ? 'automatic' : 'classic',
                },
              ],
            ],

            plugins: [
              isEnvDevelopment
                && shouldUseReactRefresh
                && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
            cacheDirectory: true,
            cacheCompression: false,
            compact: isEnvProduction,
          },
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              mode: 'icss',
            },
          }),
          // 指定无法 tree shaking
          sideEffects: true,
        },
        // css 模块化，如果使用就相当于没有载，不需要sideEffects
        {
          test: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              mode: 'local',
              getLocalIdent: getCSSModuleLocalIdent,
            },
          }),
        },
        {
          test: lessRegex,
          exclude: lessModuleRegex,
          use: [...getStyleLoaders({
            importLoaders: 2,
            modules: {
              mode: 'icss',
            },
          }), 'less-loader'],
          // 指定无法 tree shaking
          sideEffects: true,
        },
        {
          test: lessModuleRegex,
          use: [...getStyleLoaders({
            importLoaders: 2,
            modules: {
              mode: 'local',
              getLocalIdent: getCSSModuleLocalIdent,
            },
          }), 'less-loader'],
        },
        {
          exclude: [/^$/, /\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          type: 'asset/resource',
        },
      ],
    },
  ],
};
