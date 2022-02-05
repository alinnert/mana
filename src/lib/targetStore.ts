import {
  TargetEventHandler,
  TargetOptions,
  TargetProps,
} from '../api/registerTarget'

/**
 * Describes a registered target, its configuration object and all occurrences
 * in the DOM.
 */
interface TargetDescriptor<P extends TargetProps> {
  options: TargetOptions<P> | null
  contexts: Map<HTMLElement, TargetContext<P>>
}

/**
 * Describes a context for one target instance. It gets passed to the callback
 * methods provided in a targets configuration object.
 */
export interface TargetContext<P extends Record<string, unknown>> {
  element: HTMLElement
  props: P
  // TODO: add signals
}

/**
 * A list of all registered Targets.
 */
 interface Targets<T extends Record<string, unknown>> {
  [targetName: string]: TargetDescriptor<T>
}

/**
 * The global target storage. Contains all registered targets.
 */
const targets: Targets<Record<string, unknown>> = {}

/**
 * Makes sure a target name is present in the target storage and initializes it
 * with default data.
 * @param targetName 
 */
function addTargetName(targetName: string): void {
  targets[targetName] ??= { options: null, contexts: new Map() }
}

/**
 * Adds a configuration object for a new target to the target storage.
 * @param options The configuration object for the target to add.
 */
export function addTarget<P extends Record<string, unknown>>(
  options: TargetOptions<P>,
): void {
  addTargetName(options.name)

  // TS errors here because the type of `targets` is still incorrect.
  targets[options.name].options = options

  for (const context of targets[options.name].contexts.values()) {
    setTimeout(() => {
      options.mount?.(context)
    }, 0)
  }
}

/**
 * Adds an element for a given target name to the target storage.
 * @param targetName The target name to which the element should be added to.
 * @param elements The element to add to the storage.
 */
export function addElements<
  Props extends Record<string, unknown>,
  PropName extends Extract<keyof Props, string>,
>(targetName: string, elements: HTMLElement[]): void {
  addTargetName(targetName)

  for (const element of elements) {
    setTimeout(() => {
      const propsData = targets[targetName].options?.props ?? {}
      const propsEntries = Object.entries(propsData)

      // TS errors here because the type of `targets` is still incorrect.
      const propsPropertyDescriptors = propsEntries.map<
        [PropName, PropertyDescriptor]
      >(([propName, propData]) => {
        return [
          propName,
          {
            get(): Props[PropName] {
              const attributeName = propData.attribute ?? `data-${propName}`
              const attributeValue = element.getAttribute(attributeName)

              if (propData.type === undefined) {
                return attributeValue ?? ''
              }

              return propData.type?.parse(attributeValue ?? '')
            },
            set(value: Props[PropName]) {
              const attributeName = propData.attribute ?? `data-${propName}`

              if (propData.type === undefined) {
                element.setAttribute(attributeName, value)
              } else {
                const attributeValue = propData.type.stringify(value)
                element.setAttribute(attributeName, attributeValue)
              }
            },
          },
        ]
      })

      const props: Props = Object.create(
        Object.prototype,
        Object.fromEntries(propsPropertyDescriptors),
      )

      const context: TargetContext<Props> = { element, props }
      targets[targetName].contexts.set(element, context)
      mountElement(targetName, element)
    }, 0)
  }
}

/**
 * Removes an element for a given target name from the target storage.
 * @param targetName 
 * @param elements 
 * @returns 
 */
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

/**
 * Calls the `update` callback of a given target for a given element.
 * @param targetNames The name of the target to call the `update` callback on.
 * @param element The element for which the `update` callback should be called.
 */
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

/**
 * Does all the work that needs to be done when mounting a new element for a
 * given target name.
 * @param targetName The target name for which the element should be mounted.
 * @param element The element that should be mounted.
 */
function mountElement<P extends Record<string, unknown>>(
  targetName: string,
  element: HTMLElement,
): void {
  const target = targets[targetName]
  const context = target.contexts.get(element)
  if (context === undefined) return

  target.options?.mount?.(context)

  const events = target.options?.events ?? {}
  const eventNames = Object.keys(events)

  for (const key of eventNames) {
    const eventName = key as keyof HTMLElementEventMap
    const callback = events[eventName] as TargetEventHandler<
      HTMLElementEventMap[typeof eventName],
      P
    >

    element.addEventListener(eventName, (ev) => {
      const event = ev
      // TS error here because the type of `targets` is still incorrect.
      callback?.(context, event)
    })
  }
}

/**
 * Does all the work that needs to be done when unmounting an element for a
 * given target name.
 * @param targetName 
 * @param element 
 */
function unmountElement(targetName: string, element: HTMLElement): void {
  const target = targets[targetName]
  const context = target.contexts.get(element)
  if (context === undefined) return

  target.options?.unmount?.(context)
}
