import _ from 'lodash';
import printMe from './print.js';
// import DOM from './dom';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');


  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innterHTML = 'Click and check console';
  btn.onclick = printMe;
  btn.innerHTML = "test1"
  element.appendChild(document.createElement('br'))
  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
