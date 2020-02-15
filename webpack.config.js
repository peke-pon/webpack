const path = require('path');
// vueプラグインを読み込むため
const { VueLoaderPlugin } = require("vue-loader");
// 絶対パスに変換
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: "development",
  // バンドル対象ファイルの設定
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: outputPath
  },
  module: {
    rules: [
      {
        // 読み込む画像ファイルの指定
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        // base64で画像を埋め込む
        loader: "url-loader",
        // 画像をパスで読み込み
        options: {
          limit: 512,
          name: "./images/[name].[ext]"
        }
      },
      {
        // 対象ファイル
        test: /\.css$/,
        // 後ろから読み込まれていく
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        // sassを初めに変換
        use: ["style-loader", "vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        // vueの読み込み
        test: /\.vue$/,
        loader: "vue-loader"
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
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  plugins: [new VueLoaderPlugin()],
  // devserverのルートフォルダを指定
  devServer: {
    contentBase: outputPath
  }
};
