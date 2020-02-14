import _ from 'lodash';

const array = ["❖ ", "web", "pack",];

const elm = document.createElement('p')
elm.innerHTML = _.join(array, '');

document.body.appendChild(elm);

