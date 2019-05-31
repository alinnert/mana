export function arrayFrom<T>(arrayLike: ArrayLike<T>): Array<T> {
  return Array.prototype.slice.apply(arrayLike)
}

export function arrayFlatten(array: Array<any>): Array<any> {
  const result: Array<any> = []

  array.forEach(item => {
    if (Array.isArray(item)) {
      item.forEach(subitem => { result.push(subitem) })
    } else {
      result.push(item)
    }
  })

  return result
}

export function arrayFlatMap<T>(array: Array<T>, callback: (item: T) => Array<any> | any | undefined): Array<any> {
  const result: Array<T> = []

  array.forEach(item => {
    const returnValue = callback(item)

    if (Array.isArray(returnValue)) {
      returnValue.forEach(it => result.push(it))
    } else if (returnValue !== undefined) {
      result.push(returnValue)
    }
  })

  return result
}