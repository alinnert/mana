import { addTarget, TargetContext } from '../lib/targetStore'

interface AttributeTypeDescriptor<T> {
  parse: (value: string) => T
  stringify: (value: T) => string
}

export type TargetEventHandler<
  E extends HTMLElementEventMap[keyof HTMLElementEventMap],
> = (context: TargetContext, event: E) => void

export type TargetEvents = {
  [event in keyof HTMLElementEventMap]?: TargetEventHandler<
    HTMLElementEventMap[event]
  >
}

interface TargetOptionsTypeParam {
  props?: {
    [propName: string]: unknown
  }
}

export interface TargetOptions<T extends TargetOptionsTypeParam> {
  name: string

  props?: {
    [propName: string]: {
      attribute?: string
      default?: string
      type?: AttributeTypeDescriptor<T['props'][typeof propName]>
    }
  }

  // signals?: {
  //   [signalName: string]: SignalCallback
  // }
  events?: TargetEvents
  mount?: (instance: TargetContext) => void
  unmount?: (instance: TargetContext) => void
  update?: (instance: TargetContext) => void
}

export function registerTarget<T extends TargetOptionsTypeParam = {}>(
  targetOptions: TargetOptions<T>,
): void {
  addTarget(targetOptions)
}
