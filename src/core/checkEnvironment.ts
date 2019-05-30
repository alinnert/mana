import { log, LogType } from "./logger"

export function checkEnvironment(): boolean {
  const documentIsMissing = typeof document === 'undefined'
  const bodyIsMissing = typeof document.body === 'undefined'
  const mutationObserverIsMissing = typeof MutationObserver === 'undefined'

  let message = ''
  
  if (documentIsMissing || bodyIsMissing) {
    message = 'Mana must run in a browser environment.'
  } else if (mutationObserverIsMissing) {
    message = 'Mana requires "Mutation Observer" to be present. Either run it in a modern browser or use a Mutation Observer polyfill.'
  }

  if (message !== '') {
    log(LogType.EnvironmentError, message)
    return false
  }

  return true
}