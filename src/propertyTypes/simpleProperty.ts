import { PropertyTypeDescriptor } from "./index";

export function simpleProperty(): PropertyTypeDescriptor<string> {
  return {
    parse(attributeString) { return attributeString },
    stringify(value) { return value }
  }
}
