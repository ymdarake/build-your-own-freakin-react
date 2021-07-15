const DidactDOM = require('./dom');
const DidactFiber = require('./fiber');

module.exports = {
  run: () => window.requestIdleCallback(DidactFiber.workLoop),
  createElement: DidactDOM.createElement,
  render: DidactFiber.render,
};
