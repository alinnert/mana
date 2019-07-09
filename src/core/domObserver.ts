import { registerElement, unregisterElement } from './controllerElementStore'
import { ManaClassDescriptor } from './ControllerTypes'
import { isElement } from './domFunctions'
import { arrayFlatMap, arrayFrom } from './utils'

/** @description An enum to signalize if an element has been added or removed. */
enum ChangeType { Add, Remove }

const observerCallback: MutationCallback = (mutations: MutationRecord[]) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes') {
      const { target, attributeName } = mutation
      console.log(target, 'has a new value for attribute', attributeName)
    } else if (mutation.type === 'childList') {
      const { addedNodes, removedNodes } = mutation

      if (addedNodes.length) { handleElementChange(addedNodes, ChangeType.Add) }
      if (removedNodes.length) { handleElementChange(removedNodes, ChangeType.Remove) }
    }
  })
}

/** @description This function starts the observation process to check if elements get added or removed from the DOM. */
export function initObserver(): void {
  // Register all elements that were present from the beginning.
  handleElementChange(document.querySelectorAll('[class*="@"]'), ChangeType.Add)

  const bodyElement = document.body
  const options: MutationObserverInit = { childList: true, attributes: true, subtree: true }
  const observer = new MutationObserver(observerCallback)
  const startObservation = () => { observer.observe(bodyElement, options) }

  document.addEventListener('DOMContentLoaded', startObservation)
}

/** @description Some element has been added or removed. Take care of that. */
function handleElementChange(nodes: NodeList, change: ChangeType) {
  const elements = fetchManaElements(nodes)
  const classes = arrayFlatMap(elements, parseManaClasses)

  classes.forEach(classData => {
    if (change === ChangeType.Add) return registerElement(classData)
    if (change === ChangeType.Remove) return unregisterElement(classData)
  })
}

/** @description Filter all nodes and only return elements that contain a `@` in their className. */
function fetchManaElements(nodes: NodeList): HTMLElement[] {
  const elements = (arrayFrom(nodes).filter(isElement) as HTMLElement[])
  const rootElements = elements.filter(it => it.className.includes('@'))
  const childElements = arrayFlatMap(elements, it => arrayFrom(it.querySelectorAll('[class*="@"]')) as HTMLElement[])
  return [...rootElements, ...childElements]
}

/** @description Parse all classes of an element and retrieve all necessary information for Mana. */
function parseManaClasses(element: HTMLElement): ManaClassDescriptor[] {
  const classes = element.className.split(' ').filter(it => it.includes('@'))
  return classes.map(className => {
    const classDescriptor: ManaClassDescriptor = { element, controller: '' }
    let restString = className

    if (restString.includes('.')) {
      const dotIndex = restString.indexOf('.')
      classDescriptor.target = restString.substr(dotIndex + 1)
      restString = restString.substring(0, dotIndex)
    }

    if (restString.includes('#')) {
      const hashIndex = restString.indexOf('#')
      classDescriptor.tag = restString.substr(hashIndex + 1)
      restString = restString.substring(0, hashIndex)
    }

    classDescriptor.controller = restString.substr(1)

    return classDescriptor
  })
}