let nextUnitOfWork = null;
let wipRoot = null;
// last fiber tree we committed to the DOM
let currentRoot = null;
let deletions = [];

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    // a link to the old fiber, the fiber that we committed to the DOM in the previous commit phase
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

// adds nodes to dom
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    DidactDOM.updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === 'DELETION') {
    domParent.removeChild(fiber.dom);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = DidactDOM.createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  // create new fibers for children
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const isSameType = oldFiber && element && element.type == oldFiber.type;

    if (isSameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
      };
    }
    if (element && !isSameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
      };
    }
    if (oldFiber && !isSameType) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    ++index;
  }
}

function workLoop(deadline) {
  console.warn('workLoop!');
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  window.requestIdleCallback(workLoop);
}

module.exports = {
  render,
  workLoop,
};
