import { getTargetNamesFromClassList } from './getTargetNamesFromClassList'
import { updateElement } from './targetStore'

export function handleAttributeChange(node: Node, attributeName: string): void {
  if (!(node instanceof HTMLElement)) return

  const targetNames = getTargetNamesFromClassList(node.classList)

  updateElement(targetNames, node)
}
