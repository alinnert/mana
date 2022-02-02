import { getTargetElements } from './getTargetElements'
import { addElements } from './targetStore'

/**
 * Handle added node
 */
export function handleNodeAdded(node: Node): void {
  if (!(node instanceof HTMLElement)) return

  const targetElements = getTargetElements(node)

  for (const [targetName, elements] of Object.entries(targetElements)) {
    addElements(targetName, elements)
  }
}
