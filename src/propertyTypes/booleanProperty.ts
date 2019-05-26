import { PropertyTypeDescriptor, InvalidHTMLPropertyError } from "./index";

type BooleanPropertyOptions = {
  true: string | string[]
  false: string | string[]
  caseSensitive?: boolean
}

const booleanPropertyDefaultOptions: BooleanPropertyOptions = {
  true: 'true', false: 'false', caseSensitive: false
}

export function booleanProperty(
  options: BooleanPropertyOptions = booleanPropertyDefaultOptions
): PropertyTypeDescriptor<boolean> {
  const trueValues = typeof options.true === 'string' ? [options.true] : options.true
  const falseValues = typeof options.false === 'string' ? [options.false] : options.false

  return {
    parse(attributeString) {
      if (options.caseSensitive) {
        if (trueValues.includes(attributeString)) { return true }
        if (falseValues.includes(attributeString)) { return false }
      } else {
        if (trueValues.map(value => value.toLowerCase()).includes(attributeString.toLowerCase())) { return true }
        if (falseValues.map(value => value.toLowerCase()).includes(attributeString.toLowerCase())) { return false }
      }

      throw new InvalidHTMLPropertyError()
    },
    stringify(value) {
      if (value === true) { return trueValues[0] }
      if (value === false) { return falseValues[0] }

      throw new InvalidHTMLPropertyError()
    }
  }
}
