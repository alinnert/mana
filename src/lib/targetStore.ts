import { TargetEventHandler, TargetOptions } from '../api/registerTarget'

interface TargetDescriptor {
  options: TargetOptions | null
  contexts: Map<HTMLElement, TargetContext>
}

interface Targets {
  [targetName: string]: TargetDescriptor
}

export interface TargetContext {
  element: HTMLElement
  // props
  // (signals)
}

const targets: Targets = {}

function addTargetName(targetName: string): void {
  targets[targetName] ??= { options: null, contexts: new Map() }
}

export function addTarget(options: TargetOptions): void {
  addTargetName(options.name)

  targets[options.name].options = options

  for (const context of targets[options.name].contexts.values()) {
    setTimeout(() => {
      options.mount?.(context)
    }, 0)
  }
}

export function addElements(targetName: string, elements: HTMLElement[]): void {
  addTargetName(targetName)

  for (const element of elements) {
    setTimeout(() => {
      const context: TargetContext = { element }
      targets[targetName].contexts.set(element, context)
      mountElement(targetName, element)
    }, 0)
  }
}

export function removeElements(
  targetName: string,
  elements: HTMLElement[],
): void {
  if (targets[targetName] === undefined) return

  for (const element of elements) {
    setTimeout(() => {
      unmountElement(targetName, element)
      targets[targetName].contexts.delete(element)
    }, 0)
  }
}

export function updateElement(
  targetNames: string[],
  element: HTMLElement,
): void {
  for (const targetName of targetNames) {
    const context = targets[targetName].contexts.get(element)
    if (context === undefined) return

    targets[targetName].options?.update?.(context)
  }
}

function mountElement(targetName: string, element: HTMLElement): void {
  const target = targets[targetName]
  const context = target.contexts.get(element)
  if (context === undefined) return

  target.options?.mount?.(context)

  const events = target.options?.events ?? {}
  const eventNames = Object.keys(events)

  for (const key of eventNames) {
    const eventName = key as keyof HTMLElementEventMap
    const callback = events[eventName] as TargetEventHandler<
      HTMLElementEventMap[typeof eventName]
    >

    element.addEventListener(eventName, (ev) => {
      const event = ev
      callback?.(context, event)
    })
  }
}

function unmountElement(targetName: string, element: HTMLElement): void {
  const target = targets[targetName]
  const context = target.contexts.get(element)
  if (context === undefined) return

  target.options?.unmount?.(context)
}
