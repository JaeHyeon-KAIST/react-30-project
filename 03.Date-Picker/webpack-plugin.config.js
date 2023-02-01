
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const plugins = [
  new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
  new MiniCssExtractPlugin({filename:"style.css"}),
  // new CopyWebpackPlugin({
  //     patterns: [
  //       { from: "./src/images", to: "./images" },
  //     ],
  //   }),
];
if (process.env.NODE_ENV === "production") {
  plugins.push(new CleanWebpackPlugin());
}

module.exports = {
  plugins,
}

// export default plugins;