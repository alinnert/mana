import { tokens } from './constants'
import { addElementsByTargetElementsMap } from './targetRegister'

// #region types
export interface TargetNameElementsMap {
  [targetName: string]: HTMLElement[]
}
// #endregion types

function getTargetNamesFromClassList (classList: DOMTokenList): string[] {
  return Array.from(classList)
    .filter(className => className.startsWith(tokens.targetClassNamePrefix))
    .map(className => className.replace(/^@/, ''))
}

function getTargetElementsMapFromTree (
  element: HTMLElement
): TargetNameElementsMap {
  const targetElementMap: TargetNameElementsMap = {}
  const selector = `[class*="${tokens.targetClassNamePrefix}"]`
  const targetElements = Array.from(
    element.querySelectorAll<HTMLElement>(selector)
  )
  if (element.matches(selector)) targetElements.push(element)

  for (const target of targetElements) {
    const targetNames = getTargetNamesFromClassList(target.classList)

    for (const targetName of targetNames) {
      if (!Array.isArray(targetElementMap[targetName])) {
        targetElementMap[targetName] = []
      }

      targetElementMap[targetName].push(target)
    }
  }

  return targetElementMap
}

/**
 * Handle added node
 */
export function handleAddedNode (
  addedNode: Node
): void {
  if (!(addedNode instanceof HTMLElement)) return
  const targetElementMap = getTargetElementsMapFromTree(addedNode)
  addElementsByTargetElementsMap(targetElementMap)
}

/**
 * Handle removed node
 */
export function handleRemovedNode (
  removedNode: Node
): void {
  if (!(removedNode instanceof HTMLElement)) return
  const targetElementMap = getTargetElementsMapFromTree(removedNode)
}
