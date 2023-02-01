const path = require('path');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const webpackMode = process.env.NODE_ENV || "development";

const plugins = require("./webpack-plugin.config.js");

module.exports = merge(plugins, {
  name: 'virtual-keyboard',
  mode: webpackMode,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './src/js/index',
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].min.js",
  },
  devServer: {
    static: { directory: path.resolve(__dirname) },
    hot: true,
    port: 8084,
    allowedHosts: "all",
    host: "0.0.0.0",
    client: {
      webSocketURL: 'ws://0.0.0.0/npm/ws',
    },
  },
  optimization: {
    minimizer:
      webpackMode === "production"
        ? [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
              extractComments: false
            }),
            new CssMinimizerPlugin(),
          ]
        : [],
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {browsers: ['> 5% in KR', 'last 2 chrome versions']},
              debug: true,
            }],
            '@babel/preset-react',
          ],
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }
    ],
  },
});