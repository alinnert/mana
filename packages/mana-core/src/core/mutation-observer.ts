import { WatcherOptions } from '../api/watch-class-name'
import { handleNodeChange } from './handle-node-change'
import { handleAttributeChange } from './handle-attribute-change'

// #region types
export interface WatchersList {
  [className: string]: WatcherOptions
}

export interface ClassElementMatches {
  [className: string]: HTMLElement[]
}

export enum ChangeType {
  ADDED = 'onAddedCallback',
  REMOVED = 'onRemovedCallback'
}
// #endregion types

/**
 * The object that stores all registered watches and their options
 */
export const watchersList: WatchersList = {}

function getWatchedClassesFromElement (element: HTMLElement): string[] {
  const allWatchedClasses = Object.keys(watchersList)
  return allWatchedClasses
    .filter((className): boolean => element.classList.contains(className))
}

/**
 * Mutation Callback for the `MutationObserver`. Handles all mutations.
 */
const mutationCallback: MutationCallback = (mutations): void => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      if (mutation.addedNodes.length) {
        handleNodeChange(mutation.addedNodes, ChangeType.ADDED)
      }

      if (mutation.removedNodes.length) {
        handleNodeChange(mutation.removedNodes, ChangeType.REMOVED)
      }
    } else if (mutation.type === 'attributes') {
      if (mutation.attributeName !== null) {
        const affectedWatchedClasses = getWatchedClassesFromElement(
          mutation.target as HTMLElement
        )
        const attributeValue = (mutation.target as HTMLElement)
          .getAttribute(mutation.attributeName)

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
 * Initializes the `MutationObserver`.
 * Starts as soon as the first selector gets registered.
 */
export function initCore (): void {
  const options: MutationObserverInit = {
    childList: true,
    attributes: true,
    subtree: true,
    attributeOldValue: true
  }

  const observer = new MutationObserver(mutationCallback)

  const checkNextReadyState = (): void => {
    const readyStates: DocumentReadyState[] = ['interactive', 'complete']

    if (readyStates.includes(window.document.readyState)) {
      observer.observe(window.document.body, options)
    } else {
      window.document.addEventListener('readystatechange', () => {
        checkNextReadyState()
      })
    }
  }

  checkNextReadyState()
}
