import { addTarget, TargetContext } from '../lib/targetStore'

/**
 * An object with functions to convert from an HTML attribute to an arbitrary
 * type and vice versa.
 */
export type TargetPropConverter<T> = {
  parse: (value: string) => T
  stringify: (value: T) => string
}

/**
 * The list of all target prop declarations.
 */
export type TargetProps<Props extends Record<string, unknown> = {}> = {
  [propName in keyof Props]: {
    attribute?: string
    default?: string
    type?: TargetPropConverter<Props[propName]>
  }
}

/**
 * A DOM event handler.
 */
export type TargetEventHandler<
  E extends HTMLElementEventMap[keyof HTMLElementEventMap],
  P extends Record<string, unknown>,
> = (context: TargetContext<P>, event: E) => void

/**
 * A list of all DOM events.
 */
export type TargetEvents<P extends Record<string, unknown>> = {
  [event in keyof HTMLElementEventMap]?: TargetEventHandler<
    HTMLElementEventMap[event],
    P
  >
}

/**
 * The target configuration object.
 */
export interface TargetOptions<P extends Record<string, unknown>> {
  name: string
  props?: TargetProps<P>
  events?: TargetEvents<P>
  mount?: (instance: TargetContext<P>) => void
  unmount?: (instance: TargetContext<P>) => void
  // TODO: add detach callback
  update?: (instance: TargetContext<P>) => void
}

/**
 * Registers a new target and initializes every current and future instance of
 * this target.
 * @param targetOptions The target configuration object.
 */
export function registerTarget<P extends TargetProps>(
  targetOptions: TargetOptions<P>,
): void {
  addTarget(targetOptions)
}
