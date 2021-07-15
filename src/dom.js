const isEvent = (key) => key.startsWith('on');
const isProperty = (key) => key !== 'children' && !isEvent(key);
const isNewFunc = (prev, next) => (key) => prev[key] !== next[key];
const isGoneFunc = (prev, next) => (key) => !(key in next);

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);
  return dom;
}

function updateDom(dom, prevProps, nextProps) {
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGoneFunc(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = '';
    });

  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => {
      console.warn(`filtering old event listener ${key}`);
      return !(key in nextProps) || isNewFunc(prevProps, nextProps)(key);
    })
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNewFunc(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNewFunc(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      console.warn(`adding new event listener ${eventType}`);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

module.exports = {
  createElement,
  createTextElement,
  createDom,
  updateDom,
};
