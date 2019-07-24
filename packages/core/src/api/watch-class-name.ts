import { registerSelector } from '../core/mutation-observer'
import { returnValue } from '../utils'

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
    attributeName: string,
    value: string,
    oldValue: string | null
  }
) => void

export interface WatcherOptions {
  onAdded?: ElementExistenceChangedCallback;
  onRemoved?: ElementExistenceChangedCallback;
  onAttributeChanged?: AttributeValueChangedCallback;
}
// #endregion

const watchClassNameDefaultOptions: WatcherOptions = {
  onAdded: returnValue(undefined),
  onRemoved: returnValue(undefined),
  onAttributeChanged: returnValue(undefined)
}

/**
 * Add a new watcher. Watches for specific elements and executes functions
 * on addition and removal from DOM, and also on attribute manipulation.
 * @param watchClassNameUserOptions Options to define the watcher.
 */
export function watchClassName(className: string, watchClassNameUserOptions: WatcherOptions): void {
  const options = Object.assign(
    {},
    watchClassNameDefaultOptions,
    watchClassNameUserOptions
  )

  registerSelector(className, options)
}
