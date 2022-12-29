const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const webpackMode = process.env.NODE_ENV || "development";

module.exports = {
  name: 'name',
  mode: webpackMode,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './src/client',
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
    liveReload: false
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
          ]
        : [],
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [{
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
        plugins: [webpackMode === "development" && require.resolve('react-refresh/babel')].filter(Boolean),
      },
      exclude: path.join(__dirname, 'node_modules'),
    }],
  },
  plugins : [
    webpackMode === "development" && new ReactRefreshWebpackPlugin(),
    webpackMode === "production" && new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify:
          webpackMode === "production"
            ? {
                collapseWhitespace: true,
                removeComments: true,
              }
            : false,
      }),
    // new CopyWebpackPlugin({
    //     patterns: [
    //       { from: "./src/images", to: "./images" },
    //     ],
    //   }),
  ].filter(Boolean),
};