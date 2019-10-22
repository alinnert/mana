import { WatcherOptions } from '../api/watch-class-name'
import { ChangeType, watchersList, ClassElementMatches } from './mutation-observer'
import { ArgumentError } from './errors'

/**
 * Builds a CSS selector string using the provided class names.
 * @param classNames A list of class names
 */
function getSelectorFromClassNames (classNames: string | string[]): string {
  if (Array.isArray(classNames)) {
    return classNames.map((className): string => `[class~="${className}"]`).join(',')
  } else if (typeof classNames === 'string') {
    return `[class~="${classNames}"]`
  } else {
    throw new ArgumentError({
      argumentName: 'classNames',
      functionName: 'getSelectorFromClassNames',
      expectedType: 'string or string[]',
      actualType: typeof classNames
    })
  }
}

/**
 * Fetches all Elements inside the nodeList that match one of the given classes.
 * It returns all elements that match one of the given classes, grouped by class name.
 * @param nodes A nodeList to iterate through
 * @param registeredClassNames An array of class names to find in the nodeList
 */
function getWatchedElementsFromNodeList (
  nodes: NodeList | HTMLElement[],
  registeredClassNames: string | string[]
): ClassElementMatches {
  const matches: ClassElementMatches = {}
  const registeredClassesSelector = getSelectorFromClassNames(registeredClassNames)

  for (const className of registeredClassNames) {
    matches[className] = []
  }

  for (const element of nodes as NodeListOf<HTMLElement>) {
    // Check root element
    for (const className of registeredClassNames) {
      if (element.classList.contains(className)) {
        matches[className].push(element)
      }
    }

    // Check children
    const matchingChildren = element.getElementsByClassName(registeredClassesSelector)

    for (const child of matchingChildren as HTMLCollectionOf<HTMLElement>) {
      for (const className of registeredClassNames) {
        if (child.classList.contains(className)) {
          matches[className].push(child)
        }
      }
    }
  }

  return matches
}

/**
 * Handles changed nodes from the MutationObserver
 */
export function handleNodeChange (
  nodes: NodeList | HTMLElement[],
  changeType: ChangeType,
  classNames: string | string[] = Object.keys(watchersList)
): void {
  const matches = getWatchedElementsFromNodeList(nodes, classNames)

  for (const [className, elements] of Object.entries(matches)) {
    for (const element of elements) {
      let callbackName: keyof Pick<WatcherOptions, 'onAdded' | 'onRemoved'>

      if (changeType === ChangeType.ADDED) {
        callbackName = 'onAdded' as const
      } else if (changeType === ChangeType.REMOVED) {
        callbackName = 'onRemoved' as const
      } else {
        return
      }

      const callbackFunction = watchersList[className][callbackName]

      if (typeof callbackFunction === 'function') {
        callbackFunction(element)
      }
    }
  }
}
