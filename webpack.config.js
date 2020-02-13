const path = require("path");

// 絶対パスに変換
const outputPath = path.resolve(__dirname, "dist");
console.log(outputPath);

module.exports = {
  // バンドル対象ファイルの設定
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: outputPath
  }
};
