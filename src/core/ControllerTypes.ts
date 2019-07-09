import { PropertyTypeDescriptor } from "../api/propertyTypes/propertyTypeTypes"

type ControllerLifecycleMethod = (context: ControllerContext) => void

export type ElementDescriptor = string | string[]

export type ControllerList = {
  [x: string]: ControllerConfig
}

export type ControllerConfig = {
  name: string
  element: ElementDescriptor

  properties: {
    [x: string]: {
      default?: string
      type?: PropertyTypeDescriptor<any>
      dataMap?: {
        [x: string]: {
          default?: string
          type?: PropertyTypeDescriptor<any>
        }
      }
    }
  }

  targets: {
    [x: string]: {
      element?: ElementDescriptor
      single?: boolean
    }
  }

  onInit: ControllerLifecycleMethod
  onMount: ControllerLifecycleMethod
  onUnmount: ControllerLifecycleMethod
  onDestroy: ControllerLifecycleMethod
}

export type ControllerProperty<T> = {
  value: T
  onChange: (callback: (value: T, oldValue: T | undefined) => void) => void
}

export type ControllerTarget = {
  element: HTMLElement
  value: string
  html: string
}

export type ControllerTargetSet = {
  firstTarget: ControllerTarget | null
  targets: ControllerTarget[]
  firstElement: HTMLElement | null
  elements: HTMLElement[]
  onAdded: (handler: Function) => void
  onRemoved: (handler: Function) => void
  on: (event: keyof HTMLElementEventMap, handler: Function, options: boolean | AddEventListenerOptions | boolean) => void
  once: (event: keyof HTMLElementEventMap, handler: Function, options: boolean | AddEventListenerOptions | boolean) => void
  off: (event: keyof HTMLElementEventMap, handler: Function, options: boolean | EventListenerOptions | boolean) => void
}

export type ControllerContext = {
  config: ControllerConfig
  data: { [x: string]: any }
  property: { [x: string]: ControllerProperty<any> }
  target: { [x: string]: ControllerTargetSet }
  element: HTMLElement
  headElement: HTMLHeadElement
  bodyElement: HTMLBodyElement
}

export type ManaClassDescriptor = {
  element: HTMLElement
  controller: string
  tag?: string
  target?: string
}

export type ElementInformation = {
  controller: string
  context: ControllerContext
  targets: ControllerTargetSet[]
}
