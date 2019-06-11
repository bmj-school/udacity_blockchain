import _ from 'lodash';
import printMe from './print.js';
import DOM from './dom';
import './style.css';
// id="display-wrapper" class="top-20"
function component() {
  const el = DOM.div(
    {
      className: 'top-20',
      id: 'display-wrapper'
    });
  el.appendChild(DOM.p("test"))
  // const element = document.createElement('div');
  // const btn = document.createElement('button');

  const btn = DOM.button({id:"test"},'Click and check console');


  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  // btn.innerHTML = 'Click and check console';
  btn.onclick = printMe;
  // btn.innerHTML = "test1"
  // element.appendChild(document.createElement('br'))
  el.appendChild(btn);

  return el;
}

// function display(title, description, results) {
//   console.log(`display(${title}, ${description}, ${results})`);

//   let displayDiv = DOM.elid("display-wrapper");
//   let section = DOM.section();
//   section.appendChild(DOM.h2(title));
//   section.appendChild(DOM.h5(description));
//   results.map((result) => {
//     let row = section.appendChild(DOM.div({ className: 'row' }));
//     row.appendChild(DOM.div({ className: 'col-sm-4 field' }, result.label));
//     row.appendChild(DOM.div({ className: 'col-sm-8 field-value' }, result.error ? String(result.error) : String(result.value)));
//     section.appendChild(row);
//   })
//   displayDiv.append(section);
// }

function component2() {
  const sect = DOM.section()
}

document.body.appendChild(component());
