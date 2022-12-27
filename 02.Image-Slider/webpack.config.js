const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  devtool: 'source-map',
  mode: "development",
  devServer: {
    port: 8084,
    allowedHosts: "all",
    host: "0.0.0.0",
    watchFiles: 'index.html',
    client: {
      webSocketURL: 'ws://0.0.0.0/npm/ws',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Image Slider",
      template: "./src/index.html",
      inject: "body",
      favicon: "./favicon.ico"
    }),
    new MiniCssExtractPlugin({ filename: "style.css" }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.jpeg$/,
        type:'asset/inline'
      }
  ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  }
};
