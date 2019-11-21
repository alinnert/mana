import { handleAttributeChange } from './handleAttributeChange'
import { handleAddedNode, handleRemovedNode } from './handleNodeChange'

/**
 * Callback for the `MutationObserver`. Handles all mutations.
 */
const mutationCallback: MutationCallback = (mutations): void => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => handleAddedNode(node))
      mutation.removedNodes.forEach(node => handleRemovedNode(node))
    } else if (mutation.type === 'attributes') {
      if (mutation.attributeName !== null) {
        handleAttributeChange(mutation.target, mutation.attributeName)
      }
    }
  }
}

/**
 * Initializes the `MutationObserver`.
 * Starts as soon as the first selector gets registered.
 */
export function initCore (): void {
  const options: MutationObserverInit = {
    childList: true,
    attributes: true,
    subtree: true,
    attributeOldValue: true
  }

  const observer = new MutationObserver(mutationCallback)

  const checkNextReadyState = (): void => {
    const readyStates: DocumentReadyState[] = ['interactive', 'complete']

    if (readyStates.includes(window.document.readyState)) {
      observer.observe(window.document.body, options)
    } else {
      window.document.addEventListener('readystatechange', () => {
        checkNextReadyState()
      })
    }
  }

  checkNextReadyState()
}
