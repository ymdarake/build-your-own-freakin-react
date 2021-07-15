const Didact = require('../src/didact');

Didact.render(
  Didact.createElement(
    'div',
    { id: 'foo' },
    Didact.createElement('a', { onClick: console.log }, 'bar'),
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
      { id: 'foo' },
      Didact.createElement(
        'strong',
        { onClick: () => console.log('hoge') },
        'bar'
      ),
      Didact.createElement('b')
    ),
    document.getElementById('root')
  );
}, 3000);
