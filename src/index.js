// module
import _ from 'lodash';
// scss
import "./scss/style.scss";
// image
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

console.log('処理完了');