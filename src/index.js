import _ from 'lodash';
import './style.css';

const array = ["web", "pack",];

const elm = document.createElement('p')
elm.innerHTML = _.join(array, '');

document.body.appendChild(elm);