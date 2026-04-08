import { getTargetElements } from './getTargetElements'
import { addElements } from './targetStore'

/**
 * Gets called by the mutation callback when a node has been added to the DOM.
 * @param node The node that has been added to the DOM.
 */
export function handleNodeAdded(node: Node): void {
  if (!(node instanceof HTMLElement)) return

  const targetElements = getTargetElements(node)

  for (const [targetName, elements] of Object.entries(targetElements)) {
    addElements(targetName, elements)
  }
}
