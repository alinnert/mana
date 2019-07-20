import { registerSelector } from "../core/mutation-observer";

//#region types
export type WatchSelectorContext = {
  [key: string]: any
}

export type WatchSelectorCallback = (
  mutationRecord: MutationRecord,
  context: WatchSelectorContext
) => void

export type WatchSelectorOptions = {
  selector: string | null
  context?: HTMLElement
  onAdded?: WatchSelectorCallback
  onRemoved?: WatchSelectorCallback
  onAttributeChanged?: WatchSelectorCallback
}
//#endregion

const watchSelectorDefaultOptions: WatchSelectorOptions = {
  selector: null,
  context: document.body,
  onAdded: () => {},
  onRemoved: () => {},
  onAttributeChanged: () => {}
}

export function watchSelector(userOptions: WatchSelectorOptions) {
  const { selector, ...options } = Object.assign({}, watchSelectorDefaultOptions, userOptions)

  registerSelector(selector, options)
}
