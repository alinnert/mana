type ArgumentErrorArguments = {
  argumentName: string
  functionName: string
  expectedType: string
  actualType: string
}

export class ArgumentError extends Error {
  public constructor (
    { argumentName, functionName, expectedType, actualType }: ArgumentErrorArguments
  ) {
    const message = `Argument "${argumentName}" of function "${functionName}" is not of correct type. Expected type "${expectedType}", but got "${actualType}" instead.`
    super(message)
    Object.setPrototypeOf(this, ArgumentError.prototype)
  }
}
