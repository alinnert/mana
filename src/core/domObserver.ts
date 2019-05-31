import { isElement } from './domFunctions'
import { ManaClassDescriptor } from './ControllerTypes'
import { arrayFrom, arrayFlatMap, arrayFlatten } from './utils'
import { registerElement, unregisterElement } from './controllers'

enum ChangeType { Add, Remove }

export function initObserver() {
  handleElementChange(document.querySelectorAll('[class*="@"]'), ChangeType.Add)

  document.addEventListener('DOMContentLoaded', () => {
    const bodyElement = document.body
    const config: MutationObserverInit = { childList: true, attributes: true, subtree: true }
    const observer = new MutationObserver(observerCallback)
    observer.observe(bodyElement, config)

    /** @type { MutationCallback } */
    function observerCallback(mutations: MutationRecord[]) {
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
  })
}

function handleElementChange(nodes: NodeList, change: ChangeType) {
  console.log(nodes)
  const elements = fetchManaElements(nodes)
  const classes = arrayFlatMap(elements, parseManaClasses)

  classes.forEach(classData => {
    if (change === ChangeType.Add) return registerElement(classData)
    if (change === ChangeType.Remove) return unregisterElement(classData)
  })
}

function fetchManaElements(nodes: NodeList): HTMLElement[] {
  const elements = (arrayFrom(nodes).filter(isElement) as HTMLElement[])
  const rootElements = elements.filter(it => it.className.includes('@'))
  const childElements = arrayFlatMap(elements, it => arrayFrom(it.querySelectorAll('[class*="@"]')) as HTMLElement[])
  return [...rootElements, ...childElements]
}

function parseManaClasses(element: HTMLElement) {
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