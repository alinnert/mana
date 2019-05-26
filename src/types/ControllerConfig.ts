import { PropertyTypeDescriptor } from "../propertyTypes/index";

export type ElementDescriptor = string | string[]

export type ControllerConfig = {
  name: string
  element: ElementDescriptor
  properties: {
    [x: string]: {
      default?: string
      type?: PropertyTypeDescriptor<any>
    }
  }
  targets: {
    [x: string]: {
      element?: ElementDescriptor
      single?: boolean
    }
  }
  dataMaps: {
    [x: string]: string[]
  }
}
