export type PropertyTypeDescriptor<T> = {
  parse: (attributeString: string) => T
  stringify: (value: T) => string
}

export class InvalidHTMLPropertyError extends Error { }
