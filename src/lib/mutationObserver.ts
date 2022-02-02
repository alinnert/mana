import { handleAttributeChange } from './handleAttributeChange'
import { handleNodeAdded, handleNodeRemoved } from './handleNodeChange'

/**
 * Callback for the `MutationObserver`. Handles all mutations.
 */
const mutationCallback: MutationCallback = (mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => handleNodeAdded(node))
      mutation.removedNodes.forEach((node) => handleNodeRemoved(node))
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
export function initCore(): void {
  const observer = new MutationObserver(mutationCallback)
  window.document.addEventListener('readystatechange', handleReadyStateChange)
  checkReadyState()

  function handleReadyStateChange() {
    checkReadyState()
  }

  function checkReadyState(): void {
    if (!['interactive', 'complete'].includes(window.document.readyState)) {
      return
    }

    observer.observe(window.document.body, {
      childList: true,
      attributes: true,
      subtree: true,
      attributeOldValue: true,
    })

    const bodyElement = document.getElementsByTagName('body')[0]

    if (bodyElement !== undefined) {
      handleNodeAdded(bodyElement)
    }

    window.document.removeEventListener(
      'readystatechange',
      handleReadyStateChange,
    )
  }
}
