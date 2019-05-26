export * from './simpleProperty'
export * from './enumProperty'
export * from './numberProperty'
export * from './booleanProperty'

export type PropertyTypeDescriptor<T> = {
  parse: (attributeString: string) => T
  stringify: (value: T) => string
}

export class InvalidHTMLPropertyError extends Error { }



