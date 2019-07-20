import { WatchSelectorOptions } from "../api/watch-selector"

export type SelectorRegister = {
  [selector: string]: WatchSelectorOptions
}

const selectors: SelectorRegister = {

}

const mutationCallback: MutationCallback = () => {

}

export function registerSelector(
  selector: string,
  options: WatchSelectorOptions
): boolean {
  if (selectors.hasOwnProperty(selector)) { return false }
  if (Object.keys(selectors).length === 0) { initObserver() }

  selectors[selector] = options
  return true
}

function initObserver(): void {
  const options: MutationObserverInit = {
    childList: true,
    attributes: true,
    subtree: true,
    attributeOldValue: true
  }

  const observer = new MutationObserver(mutationCallback)

  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, options)
  })
}

