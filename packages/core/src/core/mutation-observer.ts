import { WatchSelectorOptions } from '../api/watch-selector'

// #region types
export type RegisterSelectorOptions = Omit<WatchSelectorOptions, 'selector'>

export interface SelectorRegister {
  [selector: string]: RegisterSelectorOptions;
}
// #endregion

const selectors: SelectorRegister = {}

const mutationCallback: MutationCallback = (): void => { }

/**
 * Initializes the `MutationObserver`. Starts as soon as the first selector gets registered.
 */
function initObserver (): void {
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
export function registerSelector (
  selector: string | null,
  options: RegisterSelectorOptions
): boolean {
  if (selector === null) { return false }
  if (selectors.hasOwnProperty(selector)) { return false }
  if (Object.keys(selectors).length === 0) { initObserver() }

  selectors[selector] = options
  return true
}
