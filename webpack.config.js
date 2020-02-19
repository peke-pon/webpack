const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const MODE = argv.mode;
  const development = MODE === 'development';
  const outputPath = path.resolve(__dirname, 'dist');

  return {
    mode: MODE,
    entry: './src/index.js',
    output: {
      path: outputPath,
      filename: development ? '[name].[hash].js' : 'main.min.js',
    },
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          loader: 'url-loader',
          options: {
            limit: 51200,
            name: './images/[name].[ext]',
          },
        },
        {
          test: /\.(sc|c|sa)ss$/,
          use: [
            development ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: development,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: development,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', { modules: false }]],
              },
            },
          ],
        },
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: development ? '[name].[hash].css' : 'style.css',
      }),
    ],
    optimization: {
      minimizer: development
        ? []
        : [
          new TerserPlugin({
            terserOptions: {
              compress: { drop_console: true },
            },
          }),
        ],
    },
    devServer: {
      contentBase: outputPath,
      port: 3000,
      open: true,
    },
    devtool: 'eval-source-map',
  };
};
