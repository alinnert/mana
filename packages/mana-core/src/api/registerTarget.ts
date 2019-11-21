import { addNewTarget } from '../core/targetRegister'

// #region types
interface TargetInstance<T extends TargetOptions> {
  props: {
    // TODO: Test if this does what I hope it does.
    [P in keyof T['props']]: T['props'][P]
  }

  sendSignal: (signalName: string) => void
  sendSignalUp: (signalName: string) => void
  sendSignalDown: (signalName: string) => void
}

export type SignalCallback = () => void

export type DOMEventCallback<K extends keyof HTMLElementEventMap> = (
  eventName: K,
  // TODO: I think this needs a (type) reference to the original TargetOptions instance
  targetInstance: TargetInstance<TargetOptions>
) => void

export interface AttributeTypeDescriptor {
  parse: (attributeString: string) => unknown
  stringify: (attributeValue: unknown) => string
}

export interface TargetOptions {
  props: {
    [propName: string]: {
      attribute: string
      default?: string
      type?: AttributeTypeDescriptor
    }
  }

  signals: {
    [signalName: string]: SignalCallback
  }

  events: {
    // TODO: again, does this work?
    [K in keyof HTMLElementEventMap]: DOMEventCallback<keyof HTMLElementEventMap>
  }
}
// #endregion types

export function registerTarget (
  targetName: string,
  targetOptions: TargetOptions
): void {
  addNewTarget(targetName, targetOptions)
}