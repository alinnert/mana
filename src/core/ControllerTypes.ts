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

type ControllerProperty<T> = {
  value: T
  onChange: (callback: (value: T, oldValue: T | undefined) => void) => void
}

type ControllerTarget = {
  element: HTMLElement
  value: string
  html: string
}

type ControllerTargetSet = {
  firstTarget: ControllerTarget
  targets: ControllerTarget[]
  firstElement: HTMLElement
  elements: HTMLElement[]
  onAdded: (handler: Function) => void
  onRemoved: (handler: Function) => void
  on: (event: keyof HTMLElementEventMap, handler: Function, options: boolean | AddEventListenerOptions | boolean) => void
  once: (event: keyof HTMLElementEventMap, handler: Function, options: boolean | AddEventListenerOptions | boolean) => void
  off: (event: keyof HTMLElementEventMap, handler: Function, options: boolean | EventListenerOptions | boolean) => void
}

type ControllerContext = {
  config: ControllerConfig
  data: { [x: string]: any }
  property: { [x: string]: ControllerProperty<any> }
  target: { [x: string]: ControllerTargetSet }
  element: HTMLElement
  headElement: HTMLHeadElement
  titleElement: HTMLTitleElement
  bodyElement: HTMLBodyElement
}