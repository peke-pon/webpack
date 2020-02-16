// ライブラリのインポート
import _ from 'lodash';
// scss読み込み
import "./scss/style.scss";
// 画像ファイルの読み込み
import img from "./images/webpack.svg";
import img2 from "./images/bg.svg";

const image = new Image();
image.src = img;
document.body.appendChild(image);

const image2 = new Image();
image2.src = img2;
document.body.appendChild(image2);

const array = ["web", "pack",];
const elm = document.createElement('p')
elm.innerHTML = _.join(array, '');
document.body.appendChild(elm);

// production時には削除される
console.log('処理完了');