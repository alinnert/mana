import { getTargetElements } from './getTargetElements'
import { removeElements } from './targetStore'

/**
 * Gets called by the mutation callback when an element has been removed from
 * the DOM.
 * @param node The node that has been removed from the DOM.
 */
export function handleNodeRemoved(node: Node): void {
  if (!(node instanceof HTMLElement)) return

  const targetElements = getTargetElements(node)

  for (const [targetName, elements] of Object.entries(targetElements)) {
    removeElements(targetName, elements)
  }
}
