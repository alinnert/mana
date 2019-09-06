// #region types
export type ValueFilterOptions = {
  wait: number
  ignoreSameValue: boolean
}

export type ValueFilterCallback = (value: unknown) => void
export type ValueFilterFunction = (value: unknown, callback: ValueFilterCallback) => void
// #endregion

export function createValueFilter (options: ValueFilterOptions): ValueFilterFunction {
  const { wait, ignoreSameValue }: ValueFilterOptions = {
    wait: 0,
    ignoreSameValue: false,
    ...options
  }

  const previousValue: unknown = null
  let timeout: number = null

  return function (value: unknown, callback: ValueFilterCallback): void {
    if (timeout !== null) { window.clearTimeout(timeout) }

    timeout = window.setTimeout(() => {
      timeout = null
      if (ignoreSameValue && value === previousValue) { return }
      callback(value)
    }, wait)
  }
}
