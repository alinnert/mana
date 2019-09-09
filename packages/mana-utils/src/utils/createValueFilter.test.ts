import { createValueFilter, ValueFilterCallback } from './createValueFilter'
import { handleError, handleSuccess } from '../results'

type TestCase = { timeout: number; expectedLog: string[] }

const tests: Promise<void[]>[] = []

function log (valueLog: string[]): ValueFilterCallback {
  return function (value): void {
    valueLog.push(`${value}`)
  }
}

async function runTestTable (
  testTable: Array<TestCase>, valueLog: string[]
): Promise<void[]> {
  const promises: Promise<void>[] = []

  for (const testEntry of testTable) {
    promises.push(new Promise((resolve): void => {
      const cb = (): void => {
        if (valueLog.length !== testEntry.expectedLog.length) {
          handleError(`Value log has ${valueLog.length} entries. Expected ${testEntry.expectedLog.length}.`)
        }

        for (const i in testEntry.expectedLog) {
          if (valueLog[i] !== testEntry.expectedLog[i]) {
            handleError(`Value with index ${i} is ${valueLog[i]}. Expected ${testEntry.expectedLog[i]}.`)
          }
        }

        resolve()
      }

      setTimeout(cb, testEntry.timeout)
    }))
  }

  return Promise.all(promises)
}

{
  // Basic test with ignoreSameValue = true
  const setValue = createValueFilter({ ignoreSameValue: true, wait: 100 })
  const valueLog: string[] = []

  setValue('first value', log(valueLog))
  setValue('second value', log(valueLog))
  setTimeout(() => { setValue('second value', log(valueLog)) }, 200)

  const testTable: TestCase[] = [
    { timeout: 50, expectedLog: [] },
    { timeout: 150, expectedLog: ['second value'] },
    { timeout: 250, expectedLog: ['second value'] }
  ]

  tests.push(runTestTable(testTable, valueLog))
}

{
  // Basic test with ignoreSameValue = true and longer timeout
  const setValue = createValueFilter({ ignoreSameValue: true, wait: 1000 })
  const valueLog: string[] = []

  setValue('first value', log(valueLog))
  setTimeout(() => { setValue('second value', log(valueLog)) }, 750)
  setTimeout(() => { setValue('third value', log(valueLog)) }, 2000)

  const testTable: TestCase[] = [
    { timeout: 50, expectedLog: [] },
    { timeout: 600, expectedLog: [] },
    { timeout: 1000, expectedLog: [] },
    { timeout: 1500, expectedLog: [] },
    { timeout: 1900, expectedLog: ['second value'] },
    { timeout: 2500, expectedLog: ['second value'] },
    { timeout: 3200, expectedLog: ['second value', 'third value'] }
  ]

  tests.push(runTestTable(testTable, valueLog))
}

{
  // Basic test with ignoreSameValue = false
  const setValue = createValueFilter({ ignoreSameValue: false, wait: 100 })
  const valueLog: string[] = []

  setValue('first value', log(valueLog))
  setValue('second value', log(valueLog))
  setTimeout(() => { setValue('second value', log(valueLog)) }, 200)

  const testTable: TestCase[] = [
    { timeout: 50, expectedLog: [] },
    { timeout: 150, expectedLog: ['second value'] },
    { timeout: 350, expectedLog: ['second value', 'second value'] }
  ]

  tests.push(runTestTable(testTable, valueLog))
}

Promise.all(tests).then(() => { handleSuccess() })
