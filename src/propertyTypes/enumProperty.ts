import { PropertyTypeDescriptor, InvalidHTMLPropertyError } from "./index";

type EnumPropertyOptions = {
  items: string[]
}

const enumPropertyDefaultOptions: EnumPropertyOptions = { items: [] }

export function enumProperty(
  options: EnumPropertyOptions = enumPropertyDefaultOptions
): PropertyTypeDescriptor<string> {
  return {
    parse(attributeString) {
      if (options.items.includes(attributeString)) { return attributeString }

      throw new InvalidHTMLPropertyError()
    },
    stringify(value) {
      if (options.items.includes(value)) { return value }

      throw new InvalidHTMLPropertyError()
    }
  }
}