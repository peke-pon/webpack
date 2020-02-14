const path = require("path");

// 絶対パスに変換
const outputPath = path.resolve(__dirname, "dist");

module.exports = {
  // バンドル対象ファイルの設定
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: outputPath
  },
  // モジュールの読み込み
  module: {
    rules: [
      {
        // 対象ファイル
        test: /\.css$/,
        // 後ろから読み込まれていく
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  // index.htmlのフォルダを指定
  devServer: {
    contentBase: outputPath
  }
};
