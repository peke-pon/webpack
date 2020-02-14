const path = require('path');

// 絶対パスに変換
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  // バンドル対象ファイルの設定
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: outputPath
  },
  // モジュールの読み込み
  module: {
    rules: [
      {
        // 対象ファイル
        test: /\.css$/,
        // 後ろから読み込まれていく
        use: ['style-loader', 'css-loader']
      },
      {
        // 読み込む画像ファイルの指定
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        // base64で画像を埋め込む
        loader: 'url-loader',
        // 画像をパスで読み込み
        options: {
          limit: 512,
          name: './images/[name].[ext]'
        }
      },
      {
        // 対象ファイル
        test: /\.scss$/,
        // sassを初めに変換
        use: ['style-loader', 'css-loader','sass-loader']
      }
    ]
  },
  // index.htmlのフォルダを指定
  devServer: {
    contentBase: outputPath
  }
};
