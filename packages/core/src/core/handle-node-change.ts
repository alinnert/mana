import { WatcherOptions } from '../api/watch-class-name'
import { ChangeType, watchersList, ClassElementMatches } from './mutation-observer'

/**
 * Builds a CSS selector string using the provided class names.
 * @param classNames A list of class names
 */
function getSelectorFromClassNames (classNames: string[]): string {
  return classNames.map((className): string => `[class~="${className}"]`).join(',')
}

/**
 * Fetches all Elements inside the nodeList that match one of the given classes.
 * It returns all elements that match one of the given classes, grouped by class name.
 * @param nodes A nodeList to iterate through
 * @param registeredClassNames An array of class names to find in the nodeList
 */
function getWatchedElementsFromNodeList (
  nodes: NodeList,
  registeredClassNames: string[]
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
export function handleNodeChange (nodes: NodeList, changeType: ChangeType): void {
  const matches = getWatchedElementsFromNodeList(nodes, Object.keys(watchersList))

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
