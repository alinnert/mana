import { getTargetNamesFromClassList } from './getTargetNamesFromClassList'

interface GetTargetElementsResult {
  [targetName: string]: HTMLElement[]
}

export const targetClassNamePrefix = '@'

export function getTargetElements(
  element: HTMLElement,
): GetTargetElementsResult {
  const result: GetTargetElementsResult = {}
  const selector = `[class*="${targetClassNamePrefix}"]`
  const targetElements = Array.from(
    element.querySelectorAll<HTMLElement>(selector),
  )

  if (element.matches(selector)) {
    targetElements.push(element)
  }

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
