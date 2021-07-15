const DidactDOM = require('./dom');
const DidactFiber = require('./fiber');

const Didact = {
  createElement: DidactDOM.createElement,
  render: DidactFiber.render,
};

const element = Didact.createElement(
  'div',
  { id: 'foo' },
  Didact.createElement('a', null, 'bar'),
  Didact.createElement('b')
);

const container = document.getElementById('root');

Didact.render(element, container);

window.requestIdleCallback(DidactFiber.workLoop);
