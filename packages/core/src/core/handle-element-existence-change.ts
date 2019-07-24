import { WatcherOptions } from '../api/watch-class-name'
import { ChangeType, ClassElementMatches, watchersList } from './mutation-observer'

export function handleElementExistenceChange (
  matches: ClassElementMatches,
  changeType: ChangeType
): void {
  for (const [className, elements] of Object.entries(matches)) {
    for (const element of elements) {
      let callbackName: keyof Pick<WatcherOptions, 'onAdded' | 'onRemoved'>

      if (changeType === ChangeType.ADDED) {
        callbackName = 'onAdded' as const
      } else if (changeType === ChangeType.REMOVED) {
        callbackName = 'onRemoved' as const
      } else {
        return
      }

      const callbackFunction = watchersList[className][callbackName]

      if (typeof callbackFunction === 'function') {
        callbackFunction(element)
      }
    }
  }
}
