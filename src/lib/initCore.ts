import { handleNodeAdded } from './handleNodeAdded'
import { mutationCallback } from './mutationCallback'

/**
 * Initializes the `MutationObserver`.
 */
export function initCore(): void {
  const observer = new MutationObserver(mutationCallback)

  document.addEventListener('readystatechange', handleReadyStateChange)

  checkReadyState()

  function handleReadyStateChange() {
    checkReadyState()
  }

  function checkReadyState(): void {
    if (!['interactive', 'complete'].includes(document.readyState)) return

    observer.observe(document.body, {
      childList: true,
      attributes: true,
      subtree: true,
      attributeOldValue: true,
    })

    const bodyElement = document.getElementsByTagName('body')[0]

    if (bodyElement !== undefined) {
      handleNodeAdded(bodyElement)
    }

    document.removeEventListener('readystatechange', handleReadyStateChange)
  }
}
