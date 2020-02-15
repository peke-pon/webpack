const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  const MODE = argv.mode; // production or development
  const enabled = MODE === "development";
  const outputPath = path.resolve(__dirname, "dist");
  return {
    mode: MODE,
    entry: "./src/index.js",
    output: {
      filename: enabled ? "[name].[hash].js" : "main.js",
      path: outputPath
    },
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          loader: "url-loader",
          options: {
            limit: 512,
            name: "./images/[name].[ext]"
          }
        },
        {
          test: /\.(sc|c|sa)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: enabled
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: enabled
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: enabled ? "[name].[hash].css" : "style.css"
      })
    ],
    devServer: {
      contentBase: outputPath
    },
    optimization: {
      minimizer: enabled
        ? []
        : [
            new TerserPlugin({
              terserOptions: {
                extractComments: "all",
                compress: { drop_console: true }
              }
            })
          ]
    }
  };
};
