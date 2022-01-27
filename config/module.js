const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { EnvConfig } = require('./utils/env')
// const PathConfig = require('./../utils/path')

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

// 图片转换为 DataURL 的限制大小
const imageInlineSizeLimit = parseInt(
  EnvConfig.IMAGE_INLINE_SIZE_LIMIT || '10000'
)

const isEnvDevelopment = EnvConfig.NODE_ENV === 'development'
const isEnvProduction = EnvConfig.NODE_ENV === 'production'
const shouldUseReactRefresh = EnvConfig.FAST_REFRESH

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false
  }
  try {
    require.resolve('react/jsx-runtime')
    return true
  } catch (e) {
    return false
  }
})()

module.exports = {
  strictExportPresence: true,
  rules: [
    // 能够提取匹配到的模块的source-map，无论是文件或者链接或者内联模式都可
    {
      enforce: 'pre',
      exclude: /@babel(?:\/|\\{1,2})runtime/,
      test: /\.(js|jsx|ts|tsx|css)$/,
      loader: require.resolve('source-map-loader')
    },
    {
      oneOf: [
        {
          test: [/\.avif$/],
          type: 'asset',
          mimetype: 'image/avif',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit
            }
          },
          generator: {
            filename: 'static/media/avif/[name].[hash].[ext]'
          }
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit
            }
          },
          generator: {
            filename: 'static/media/image/[name].[hash].[ext]'
          }
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
        // 这里得装很多插件 @babel/core, babel-loader babel-preset-react-app babel-plugin-named-asset-import 添加package.json
        // {
        //   test: /\.(js|mjs|jsx|ts|tsx)$/,
        //   include: ConfigPath.appSrc,
        //   loader: require.resolve('babel-loader'),
        //   options: {
        //     customize: require.resolve(
        //       'babel-preset-react-app/webpack-overrides'
        //     ),
        //     presets: [
        //       [
        //         require.resolve('babel-preset-react-app'),
        //         {
        //           runtime: hasJsxRuntime ? 'automatic' : 'classic'
        //         }
        //       ]
        //     ],

        //     plugins: [
        //       isEnvDevelopment &&
        //         shouldUseReactRefresh &&
        //         require.resolve('react-refresh/babel')
        //     ].filter(Boolean),
        //     // This is a feature of `babel-loader` for webpack (not Babel itself).
        //     // It enables caching results in ./node_modules/.cache/babel-loader/
        //     // directory for faster rebuilds.
        //     cacheDirectory: true,
        //     // See #6846 for context on why cacheCompression is disabled
        //     cacheCompression: false,
        //     compact: isEnvProduction
        //   }
        // },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              mode: 'icss'
            }
          }),
          // 指定无法 tree shaking
          sideEffects: true
        },
        {
          test: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              mode: 'local'
            }
          }),
          // 指定无法 tree shaking
          sideEffects: true
        },
        {
          exclude: [/^$/, /\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          type: 'asset/resource'
        }
      ]
    }
  ]
}

function getStyleLoaders (cssOptions) {
  const { NODE_ENV, GENERATE_SOURCEMAP } = EnvConfig
  const shouldUseSourceMap = GENERATE_SOURCEMAP === 'true'
  const isEnvDevelopment = NODE_ENV === 'development'
  const isEnvProduction = NODE_ENV === 'production'

  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      options: { publicPath: '../../' }
    },
    {
      loader: require.resolve('css-loader'),
      options: Object.assign({
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment
      }, cssOptions)
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
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009'
                },
                stage: 3
              }
            ],
            'postcss-normalize'
          ]
        },
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment
      }
    }
  ].filter(Boolean)

  return loaders
}
