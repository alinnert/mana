import { tokens } from './constants'
import { addElements } from './targetStore'

function getTargetNamesFromClassList(classList: DOMTokenList): string[] {
  return Array.from(classList)
    .filter((className) => className.startsWith(tokens.targetClassNamePrefix))
    .map((className) => className.replace(/^@/, ''))
}

export interface GetTargetElementsMapFromTreeResult {
  [targetName: string]: HTMLElement[]
}

function getTargetElementsMapFromTree(
  element: HTMLElement,
): GetTargetElementsMapFromTreeResult {
  const result: GetTargetElementsMapFromTreeResult = {}
  const selector = `[class*="${tokens.targetClassNamePrefix}"]`
  const targetElements = Array.from(
    element.querySelectorAll<HTMLElement>(selector),
  )
  if (element.matches(selector)) targetElements.push(element)

  for (const target of targetElements) {
    const targetNames = getTargetNamesFromClassList(target.classList)

    for (const targetName of targetNames) {
      if (!Array.isArray(result[targetName])) {
        result[targetName] = []
      }

      result[targetName].push(target)
    }
  }

  return result
}

/**
 * Handle added node
 */
export function handleNodeAdded(node: Node): void {
  if (!(node instanceof HTMLElement)) return

  const targetElementMap = getTargetElementsMapFromTree(node)

  for (const [targetName, elements] of Object.entries(targetElementMap)) {
    addElements(targetName, elements)
  }
}

/**
 * Handle removed node
 */
export function handleNodeRemoved(node: Node): void {
  if (!(node instanceof HTMLElement)) return
  const targetElementMap = getTargetElementsMapFromTree(node)
}
