import { getTargetNamesFromClassList } from './getTargetNamesFromClassList'
import { updateElement } from './targetStore'

/**
 * Gets called by the mutation callback when an element's attribute has changed.
 * @param node The node whose attribute has changed.
 * @param attributeName The name of the attribute that has changed.
 */
export function handleAttributeChange(node: Node, _attributeName: string): void {
  if (!(node instanceof HTMLElement)) return

  const targetNames = getTargetNamesFromClassList(node.classList)

  updateElement(targetNames, node)
}
