const Didact = require('../src/didact');

Didact.render(
  Didact.createElement(
    'div',
    { id: 'foo' },
    Didact.createElement('a', { onClick: console.warn }, 'bar'),
    Didact.createElement('b')
  ),
  document.getElementById('root')
);

Didact.run();

setTimeout(() => {
  console.warn('re-rendering...');
  Didact.render(
    Didact.createElement(
      'div',
      { id: 'foo', onClick: console.log },
      Didact.createElement('strong', null, 'bar'),
      Didact.createElement('b')
    ),
    document.getElementById('root')
  );
}, 3000);
