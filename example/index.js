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

// /** @jsx Didact.createElement */
// function Counter() {
//   const [state, setState] = Didact.useState(1);
//   return <h1 onClick={() => setState((c) => c + 1)}>Count: {state}</h1>;
// }
// const element = <Counter />;
// const container = document.getElementById('root');
// Didact.render(element, container);

Didact.run();
