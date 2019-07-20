import { registerSelector } from '../core/mutation-observer'
import { returnValue } from '../utils'

// #region types
export interface WatchSelectorContext {
  [key: string]: unknown;
}

export type WatchSelectorCallback = (
  mutationRecord: MutationRecord,
  context: WatchSelectorContext
) => void

export interface WatchSelectorOptions {
  selector: string | null;
  context?: HTMLElement;
  onAdded?: WatchSelectorCallback;
  onRemoved?: WatchSelectorCallback;
  onAttributeChanged?: WatchSelectorCallback;
}
// #endregion

const watchSelectorDefaultOptions: WatchSelectorOptions = {
  selector: null,
  context: document.body,
  onAdded: returnValue(undefined),
  onRemoved: returnValue(undefined),
  onAttributeChanged: returnValue(undefined)
}

/**
 * Add a new watcher. Watches for specific elements and executes functions
 * on addition and removal from DOM, and also on attribute manipulation.
 * @param userOptions Options to define the watcher.
 */
export function watchSelector (userOptions: WatchSelectorOptions): void {
  const { selector, ...options } = Object.assign(
    {},
    watchSelectorDefaultOptions,
    userOptions
  )

  registerSelector(selector, options)
}
