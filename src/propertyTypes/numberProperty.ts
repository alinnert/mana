import { PropertyTypeDescriptor, InvalidHTMLPropertyError } from "./index";

type NumberPropertyOptions = {
  type: 'int' | 'float' | 'bigint'
}

const numberPropertyDefaultOptions: NumberPropertyOptions = {
  type: 'int'
}

export function numberProperty(
  options: NumberPropertyOptions = numberPropertyDefaultOptions
): PropertyTypeDescriptor<number | bigint> {
  return {
    parse(attributeString) {
      if (options.type === 'int') { return Number.parseInt(attributeString) }
      if (options.type === 'float') { return Number.parseFloat(attributeString) }
      if (options.type === 'bigint') { return BigInt(attributeString) }

      throw new InvalidHTMLPropertyError()
    },
    stringify(value) {
      return value.toString()
    }
  }
}
