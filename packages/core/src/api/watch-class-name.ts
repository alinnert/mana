import { watchersList } from '../core/mutation-observer'

// #region types
export interface WatchSelectorInstanceData {
  [key: string]: unknown;
}

export type ElementExistenceChangedCallback = (
  element: HTMLElement
) => void

export type AttributeValueChangedCallback = (
  element: HTMLElement,
  attributeData: {
    attributeName: string;
    value: string | null;
    oldValue: string | null;
  }
) => void

export interface WatcherOptions {
  onAdded?: ElementExistenceChangedCallback;
  onRemoved?: ElementExistenceChangedCallback;
  onAttributeChanged?: AttributeValueChangedCallback;
}
// #endregion

/**
 * Add a new watcher. Watches for specific elements and executes functions
 * on addition and removal from DOM, and also on attribute manipulation.
 * @param watchClassNameUserOptions Options to define the watcher.
 */
export function watchClassName (className: string, options: WatcherOptions): void {
  if (className === null) { return }
  if (watchersList.hasOwnProperty(className)) { return }

  watchersList[className] = options
}
