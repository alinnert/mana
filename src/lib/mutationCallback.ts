import { handleAttributeChange } from './handleAttributeChange'
import { handleNodeRemoved } from "./handleNodeRemoved"
import { handleNodeAdded } from "./handleNodeAdded"

/**
 * Callback for the `MutationObserver`. Handles all mutations.
 * @param mutations The `MutationRecord[]`.
 */
export const mutationCallback: MutationCallback = (mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => handleNodeAdded(node))
      mutation.removedNodes.forEach((node) => handleNodeRemoved(node))
    } else if (mutation.type === 'attributes') {
      if (mutation.attributeName !== null) {
        // TODO: check if a target class has been removed
        handleAttributeChange(mutation.target, mutation.attributeName)
      }
    }
  }
}
