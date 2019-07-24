import { WatcherOptions } from '../api/watch-class-name'

// #region types
export interface WatchersList {
  [className: string]: WatcherOptions;
}

export type ClassElementMatches = {
  [className: string]: HTMLElement[]
}

export enum ChangeType {
  ADDED = 'onAddedCallback',
  REMOVED = 'onRemovedCallback'
}
// #endregion

/**
 * The object that stores all registered watches and their options
 */
const watchersList: WatchersList = {}

/**
 * Builds a CSS selector string using the provided class names.
 * @param classNames A list of class names
 */
function buildSelectorFromClasses(classNames: string[]): string {
  return classNames.map(className => `[class~="${className}"]`).join(',')
}

/**
 * Fetches all Elements inside the nodeList that match one of the given classes.
 * It returns all elements that match one of the given classes, grouped by class name.
 * @param nodes A nodeList to iterate through
 * @param registeredClassNames An array of class names to find in the nodeList
 */
function fetchWatchedElements(
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

const getCallbackNameFromChangeType = (
  changeType: ChangeType
): keyof Pick<WatcherOptions, "onAdded" | "onRemoved"> => {
  const callbackNames = {
    [ChangeType.ADDED]: () => 'onAdded' as const,
    [ChangeType.REMOVED]: () => 'onRemoved' as const
  }

  return callbackNames[changeType]()
}

function handdleElementExistenceChange(
  matches: ClassElementMatches,
  changeType: ChangeType
) {
  for (const [className, elements] of Object.entries(matches)) {
    for (const element of elements) {
      const callbackName = getCallbackNameFromChangeType(changeType)
      const callbackFunction = watchersList[className][callbackName]
      if (typeof callbackFunction === 'function') {
        callbackFunction(element)
      }
    }
  }
}

/**
 * Mutation Callback for the `MutationObserver`. Handles all mutations.
 * @property mutations See: https://devdocs.io/dom/mutationrecord
 * @property observer See: https://devdocs.io/dom/mutationobserver
 */
const mutationCallback: MutationCallback = (mutations, observer): void => {
  for (const mutation of mutations) {
    // TODO Maybe I should check the value of `mutation.type`?
    // TODO Sounds like a good idea, right? RIGHT?
    const registeredClasses = Object.keys(watchersList)

    // Handle added elements
    const addedWatchedElements =
      fetchWatchedElements(mutation.addedNodes, registeredClasses)

    handdleElementExistenceChange(addedWatchedElements, ChangeType.ADDED)

    // Handle removed elements
    const removedWatchedElements =
      fetchWatchedElements(mutation.removedNodes, registeredClasses)

    handdleElementExistenceChange(removedWatchedElements, ChangeType.REMOVED)

    // Handle attribute changes
    if (mutation.attributeName !== null) {
      // TODO implement!
    }
  }
}

/**
 * Initializes the `MutationObserver`. Starts as soon as the first selector gets registered.
 */
function initObserver(): void {
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

/**
 * Registeres a new selector.
 * @param selector The selector that should be registered.
 * @param options The options to register the selector with.
 * @returns `true`: register successful / `false`: register *not* successful
 */
export function registerSelector(
  selector: string | null,
  options: WatcherOptions
): boolean {
  if (selector === null) { return false }
  if (watchersList.hasOwnProperty(selector)) { return false }
  if (Object.keys(watchersList).length === 0) { initObserver() }

  watchersList[selector] = options
  return true
}
