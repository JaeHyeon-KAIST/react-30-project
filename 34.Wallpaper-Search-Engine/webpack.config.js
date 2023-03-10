const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const webpackMode = process.env.NODE_ENV || "development";

module.exports = {
  name: 'wallpaper-search-engine',
  mode: webpackMode,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  entry: {
    app: './src/index.tsx',
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
  watchOptions: {
    ignored: ['**/node_modules', '**/dist'],
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
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {browsers: ['> 5% in KR', 'last 2 chrome versions']},
              debug: true,
            }],
            '@babel/preset-react',
            "@babel/preset-typescript",
          ],
          plugins: [webpackMode === "development" && require.resolve('react-refresh/babel')].filter(Boolean),
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|gif|png|ico)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins : [
    new Dotenv(),
    webpackMode === "development" && new ReactRefreshWebpackPlugin(),
    webpackMode === "production" && new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        minify:
          webpackMode === "production"
            ? {
                collapseWhitespace: true,
                removeComments: true,
              }
            : false,
      }),
  ].filter(Boolean),
};