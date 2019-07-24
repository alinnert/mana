import { watchersList } from './mutation-observer'

export function handleAttributeChange (
  affectedWatchedClasses: string[],
  element: HTMLElement,
  attributeName: string,
  value: string | null,
  oldValue: string | null
): void {
  for (const affectedClassName of affectedWatchedClasses) {
    const callbackFunction = watchersList[affectedClassName].onAttributeChanged
    if (typeof callbackFunction === 'function') {
      callbackFunction(element, { attributeName, value, oldValue })
    }
  }
}
