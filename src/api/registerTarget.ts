import { addTarget, TargetContext } from '../lib/targetStore'

export type TargetEventHandler<
  E extends HTMLElementEventMap[keyof HTMLElementEventMap],
> = (context: TargetContext, event: E) => void

export type TargetEvents = {
  [event in keyof HTMLElementEventMap]?: TargetEventHandler<
    HTMLElementEventMap[event]
  >
}

export interface TargetOptions {
  name: string
  // props?: {
  //   [propName: string]: {
  //     attribute: string
  //     default?: string
  //     type?: AttributeTypeDescriptor
  //   }
  // }

  // signals?: {
  //   [signalName: string]: SignalCallback
  // }
  events?: TargetEvents
  mount?: (instance: TargetContext) => void
  unmount?: (instance: TargetContext) => void
  update?: (instance: TargetContext) => void
}

export function registerTarget(targetOptions: TargetOptions): void {
  addTarget(targetOptions)
}
