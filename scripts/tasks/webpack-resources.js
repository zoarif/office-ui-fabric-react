const webpack = require('webpack');
const path = require('path');
const merge = require('./merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpackVersion = require('webpack/package.json').version;
console.log(`Webpack version: ${webpackVersion}`);

module.exports = {
  webpack,

  createConfig(packageName, isProduction, customConfig, onlyProduction) {

    const resolveLoader = {
      modules: [
        path.resolve(__dirname, '../node_modules'),
        path.resolve(process.cwd(), 'node_modules')
      ]
    };

    const module = {
      noParse: [/autoit.js/],
      rules: [
        {
          test: /\.js$/,
          use: 'source-map-loader',
          enforce: 'pre'
        }
      ]
    };

    const devtool = 'source-map';
    const configs = [];

    if (!onlyProduction) {
      configs.push(merge(
        {
          mode: 'development',
          output: {
            filename: `[name].js`,
            path: path.resolve(process.cwd(), 'dist'),
            pathinfo: false
          },
          resolveLoader,
          module,
          devtool,
          plugins: getPlugins(packageName, false)
        },
        customConfig
      ));
    }

    if (isProduction) {
      configs.push(merge({
        mode: 'production',
        output: {
          filename: `[name].min.js`,
          path: path.resolve(process.cwd(), 'dist')
        },

        resolveLoader,
        module,
        devtool,
        plugins: getPlugins(packageName, true)
      }, customConfig));
    }

    return configs;
  },

  createServeConfig(customConfig) {
    const WebpackNotifierPlugin = require('webpack-notifier');

    return merge(
      {
        devServer: {
          inline: true,
          port: 4322
        },

        mode: 'development',

        resolveLoader: {
          modules: [
            path.resolve(__dirname, '../node_modules'),
            path.resolve(process.cwd(), 'node_modules')
          ]
        },
        resolve: {
          extensions: ['.ts', '.tsx', '.js']
        },

        devtool: 'eval',

        module: {
          rules: [
            {
              test: [/\.tsx?$/],
              use: {
                loader: 'ts-loader',
                options: {
                  experimentalWatchApi: true,
                  transpileOnly: true
                }
              },
              exclude: [
                /node_modules/,
                /\.scss.ts$/,
                /\.test.tsx?$/
              ],
            },
            {
              test: /\.scss$/,
              enforce: 'pre',
              exclude: [
                /node_modules/
              ],
              use: [
                {
                  loader: '@microsoft/loader-load-themed-styles', // creates style nodes from JS strings
                },
                {
                  loader: 'css-loader', // translates CSS into CommonJS
                  options: {
                    modules: true,
                    importLoaders: 2,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    minimize: false
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: function () {
                      return [
                        require('autoprefixer')
                      ];
                    }
                  }
                },
                {
                  loader: 'sass-loader'
                }
              ]
            }
          ]
        },

        plugins: [
          new WebpackNotifierPlugin(),
          new webpack.WatchIgnorePlugin([
            /\.js$/,
            /\.d\.ts$/
          ]),
          new ForkTsCheckerWebpackPlugin()
        ]
      },
      customConfig
    );
  }

};

function getPlugins(
  bundleName,
  isProduction
) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  const plugins = [];

  if (isProduction) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: bundleName + '.stats.html',
        openAnalyzer: false,
        generateStatsFile: true,
        statsFilename: bundleName + '.stats.json',
        logLevel: 'warn'
      })
    );
  }

  return plugins;
}
