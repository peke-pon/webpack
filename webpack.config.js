// 絶対パスを取得するために使用
const path = require("path");
// ファイル名にハッシュを付与
const HtmlWebpackPlugin = require("html-webpack-plugin");
// cssを別ファイルとして読み込む
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 圧縮時にコメントやlogを削除
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  // コマンドライン引数でモードの切替
  const MODE = argv.mode; // production or development
  const development = MODE === "development";
  // pathモジュールの機能で絶対パスを取得
  const outputPath = path.resolve(__dirname, "dist");

  return {
    mode: MODE,
    // バンドル対象となるJavaScriptファイルを指定
    entry: "./src/index.js",
    // アウトプットは絶対パスで指定
    output: {
      path: outputPath,
      // 開発時はキャッシュ対策のためファイル名を毎回変更
      filename: development ? "[name].[hash].js" : "main.min.js"
    },
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          loader: "url-loader",
          options: {
            // base64でjsへ埋め込む閾値
            limit: 51200,
            name: "./images/[name].[ext]"
          }
        },
        {
          test: /\.(sc|c|sa)ss$/,
          use: [
            // 開発時は別ファイルとして読み込む
            development ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: development
              }
            },
            {
              // 後ろから変換されるのでsassはcssの前で読み込む
              loader: "sass-loader",
              options: {
                sourceMap: development
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          // トランスパイル設定
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      ]
    },
    plugins: [
      // requireしたモジュールを読み込む
      new HtmlWebpackPlugin(),
      new MiniCssExtractPlugin({
        // 開発時はファイル名をハッシュ化してキャッシュ対策
        filename: development ? "[name].[hash].css" : "style.css"
      })
    ],
    optimization: {
      // ビルド時に圧縮する際の設定
      minimizer: development　? []
        : [
            new TerserPlugin({
              terserOptions: {
                extractComments: "all",
                compress: { drop_console: true }
              }
            })
          ]
    },
    // 開発用簡易サーバーの設定
    devServer: {
      contentBase: outputPath,
      port: 3000,
      open: true
    },
    // ソースマップの設定
    devtool: "eval-source-map"
  };
};
