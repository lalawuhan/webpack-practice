const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const config = {
  entry: "./src/index.js", //will serve as entry point to bundle application
  output: {
    path: path.resolve(__dirname, "build"), //where bundled code will be stored
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], //3rd party extensions that help webpack deal with various files
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: { chunks: "all" }, // we will get a vendors-main.js with moment.js, entry point has smaller size now
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
};
module.exports = config;
