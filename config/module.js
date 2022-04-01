/* eslint-disable import/no-extraneous-dependencies */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const { DependEnvConfig } = require('./utils/env');
const PathConfig = require('./utils/path');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const {
  hasJsxRuntime,
  shouldUseReactRefresh,
  isEnvProduction,
  isEnvDevelopment,
  imageInlineSizeLimit,
  shouldUseSourceMap,
  sourceMapLoader,
} = DependEnvConfig;

function getStyleLoaders(cssOptions, preProcessor) {
  const proUseSourceMap = isEnvProduction ? shouldUseSourceMap : isEnvDevelopment;
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
        sourceMap: proUseSourceMap,
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
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
            'postcss-normalize',
          ],
        },
        sourceMap: proUseSourceMap,
      },
    },
  ].filter(Boolean);

  if (preProcessor) {
    if (preProcessor === 'sass-loader') {
      loaders.push({
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: proUseSourceMap,
          root: PathConfig.appSrc,
        },
      });
    }
    loaders.push(
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: proUseSourceMap,
        },
      },
    );
  }

  return loaders;
}

module.exports = {
  strictExportPresence: true,
  rules: [
    // 能够提取匹配到的第三方模块的source-map，无论是文件或者链接或者内联模式都可
    sourceMapLoader && {
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
            filename: 'static/asset/avif/[name].[hash].[ext]',
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
            filename: 'static/asset/image/[name].[hash].[ext]',
          },
        },
        {
          test: [/\.woff2$/, /\.eot$/, /\.ttf$/, /\.otf$/],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
          generator: {
            filename: 'static/asset/font/[name].[hash].[ext]',
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: require.resolve('@svgr/webpack'),
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/asset/svg/[name].[hash].[ext]',
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx)$/],
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: PathConfig.appSrc,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              // 生产环境下才使用 polyfill
              isEnvProduction && [
                '@babel/preset-env',
                // 按需加载
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              [
                '@babel/preset-react',
                {
                  runtime: hasJsxRuntime ? 'automatic' : 'classic',
                },
              ],
              '@babel/preset-typescript',
            ].filter(Boolean),

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
          }, 'less-loader')],
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
          }, 'less-loader')],
        },
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: [...getStyleLoaders({
            importLoaders: 2,
            modules: {
              mode: 'icss',
            },
          }, 'sass-loader')],
          // 指定无法 tree shaking
          sideEffects: true,
        },
        {
          test: sassModuleRegex,
          use: [...getStyleLoaders({
            importLoaders: 2,
            modules: {
              mode: 'local',
              getLocalIdent: getCSSModuleLocalIdent,
            },
          }, 'sass-loader')],
        },
        {
          exclude: [/^$/, /\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          type: 'asset/resource',
          generator: {
            filename: 'static/other/[name].[hash].[ext]',
          },
        },
      ],
    },
  ].filter(Boolean),
};
