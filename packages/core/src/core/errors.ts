export class ArgumentError extends Error {
  public constructor (
    argumentName: string,
    functionName: string,
    expectedType: string,
    actualType: string
  ) {
    const message = `Argument "${argumentName}" of function "${functionName}" is not of correct type. Expected type "${expectedType}", but got "${actualType}" instead.`
    super(message)
    Object.setPrototypeOf(this, ArgumentError.prototype)
  }
}
