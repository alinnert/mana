/**
 * Generates a noop function that simply returns the provided value.
 * @param returnValue The value that should be returned by the generated function.
 */
export function returnValue<T> (returnValue: T): () => T {
  return function (): T {
    return returnValue
  }
}
