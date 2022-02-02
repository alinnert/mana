import { getTargetElements } from './getTargetElements'
import { removeElements } from './targetStore'

/**
 * Handle removed node
 */
export function handleNodeRemoved(node: Node): void {
  if (!(node instanceof HTMLElement)) return

  const targetElements = getTargetElements(node)

  for (const [targetName, elements] of Object.entries(targetElements)) {
    removeElements(targetName, elements)
  }
}
