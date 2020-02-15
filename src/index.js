// module
import _ from 'lodash';
// scss
import "./style.css";
import "./style.scss";
// image
import img from "./webpack.svg";

const array = ["web", "pack",];
const elm = document.createElement('p')
elm.innerHTML = _.join(array, '');
document.body.appendChild(elm);

const image = new Image();
image.src = img;
document.body.appendChild(image);