import * as chalk from 'chalk'

export function handleError (message: string): void {
  console.error(chalk`{red ✘ Test failed}\n\n${message}\n`)
  process.exit(0)
}

export function handleSuccess (): void {
  console.log(chalk`{blue ✔ All tests OK}\n`)
}
