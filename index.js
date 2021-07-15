function createElement(type, props, ...children) {
	return {
		type,
		props: {
			...props,
			children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
		}
	}
}

function createTextElement(text) {
	return {
		type: "TEXT_ELEMENT",
		props: {
			nodeValue: text,
			children: []
		}
	}
}

function render(element, container) {
	const dom = document.createElement(element.type);
	container.appendChild(dom);
}

const Didact = {
	createElement,
	render
}

const element = Didact.createElement(
	"div",
	{ id: "foo"},
	Didact.createElement("a", null, "bar"),
	Didact.createElement("b")
)

console.dir(element, {depth: null})