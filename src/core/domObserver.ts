import { isElement, hasManaClass } from './domFunctions'

export function initObserver() {
  document.addEventListener('DOMContentLoaded', startObserver)
}

function startObserver() {
  const bodyElement = document.body
  const config: MutationObserverInit = { childList: true, attributes: true, subtree: true }
  const observer = new MutationObserver(observerCallback)
  observer.observe(bodyElement, config)

  /** @type { MutationCallback } */
  function observerCallback(mutations: MutationRecord[]) {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes') {
        const { target, attributeName } = mutation
        console.log(target, 'has a new value for attribute', attributeName)
      } else if (mutation.type === 'childList') {
        const { addedNodes, removedNodes } = mutation

        if (addedNodes.length) { handleAddedElement(addedNodes) }
        if (removedNodes.length) { handleRemovedElement(removedNodes) }
      }
    })
  }
}

function filterManaElements(nodes: NodeList): HTMLElement[] {
  return (Array.from(nodes).filter(isElement) as HTMLElement[]).filter(hasManaClass)
}

function handleAddedElement(nodes: NodeList) {
  const addedManaElements = filterManaElements(nodes)
}

function handleRemovedElement(nodes: NodeList) {
  const removedManaElements = filterManaElements(nodes)
}