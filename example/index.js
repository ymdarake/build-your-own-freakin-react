const Didact = require('../src/didact');

Didact.render(
  Didact.createElement(
    'div',
    { id: 'foo' },
    Didact.createElement('a', null, 'bar'),
    Didact.createElement('b')
  ),
  document.getElementById('root')
);

Didact.run();
