import { WatcherOptions } from '../api/watch-class-name'
import { handleElementExistenceChange } from './handleElementExistenceChange'
import { handleAttributeChange } from './handleAttributeChange'

// #region types
export interface WatchersList {
  [className: string]: WatcherOptions;
}

export interface ClassElementMatches {
  [className: string]: HTMLElement[];
}

export enum ChangeType {
  ADDED = 'onAddedCallback',
  REMOVED = 'onRemovedCallback'
}
// #endregion

/**
 * The object that stores all registered watches and their options
 */
export const watchersList: WatchersList = {}

/**
 * Builds a CSS selector string using the provided class names.
 * @param classNames A list of class names
 */
function buildSelectorFromClasses (classNames: string[]): string {
  return classNames.map((className): string => `[class~="${className}"]`).join(',')
}

/**
 * Fetches all Elements inside the nodeList that match one of the given classes.
 * It returns all elements that match one of the given classes, grouped by class name.
 * @param nodes A nodeList to iterate through
 * @param registeredClassNames An array of class names to find in the nodeList
 */
function fetchWatchedElements (
  nodes: NodeList,
  registeredClassNames: string[]
): ClassElementMatches {
  const matches: ClassElementMatches = {}
  const registeredClassesSelector = buildSelectorFromClasses(registeredClassNames)

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

function getWatchedClassesFromElement (element: HTMLElement): string[] {
  const allWatchedClasses = Object.keys(watchersList)
  return allWatchedClasses.filter((className): boolean => element.classList.contains(className))
}

/**
 * Mutation Callback for the `MutationObserver`. Handles all mutations.
 * @property mutations See: https://devdocs.io/dom/mutationrecord
 * @property observer See: https://devdocs.io/dom/mutationobserver
 */
const mutationCallback: MutationCallback = (mutations): void => {
  for (const mutation of mutations) {
    const registeredClasses = Object.keys(watchersList)

    if (mutation.type === 'childList') {
      if (mutation.addedNodes.length) {
        const addedWatchedElements = fetchWatchedElements(mutation.addedNodes, registeredClasses)
        handleElementExistenceChange(addedWatchedElements, ChangeType.ADDED)
      }

      if (mutation.removedNodes.length) {
        const removedWatchedElements = fetchWatchedElements(mutation.removedNodes, registeredClasses)
        handleElementExistenceChange(removedWatchedElements, ChangeType.REMOVED)
      }
    } else if (mutation.type === 'attributes') {
      if (mutation.attributeName !== null) {
        const affectedWatchedClasses = getWatchedClassesFromElement(mutation.target as HTMLElement)
        const attributeValue = (mutation.target as HTMLElement).getAttribute(mutation.attributeName)

        handleAttributeChange(
          affectedWatchedClasses,
          mutation.target as HTMLElement,
          mutation.attributeName,
          attributeValue,
          mutation.oldValue
        )
      }
    }
  }
}

/**
 * Initializes the `MutationObserver`. Starts as soon as the first selector gets registered.
 */
export function initObserver (): void {
  const options: MutationObserverInit = {
    childList: true,
    attributes: true,
    subtree: true,
    attributeOldValue: true
  }

  const observer = new MutationObserver(mutationCallback)

  document.addEventListener('DOMContentLoaded', (): void => {
    observer.observe(document.body, options)
  })
}
