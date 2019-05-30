export const isElement = (node: Node) => node.nodeType === Node.ELEMENT_NODE
export const hasManaClass = (element: HTMLElement) => element.className.includes('@')