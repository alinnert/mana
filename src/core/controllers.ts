import { ControllerConfig, ControllerList, ManaClassDescriptor, ControllerContext, ControllerProperty, ControllerTarget, ControllerTargetSet } from './ControllerTypes'

type ElementInformation = {
  controller: string
  context: ControllerContext
  targets: ControllerTargetSet[]
}

const headElement = document.head
const bodyElement = document.body as HTMLBodyElement
const controllers: ControllerList = {}
const elements: WeakMap<HTMLElement, ElementInformation> = new WeakMap()

// @ts-ignore
window.manaControllers = controllers
// @ts-ignore
window.manaElements = elements

export function registerController(config: ControllerConfig) {
  controllers[config.name] = config
}

export function registerElement(classDescriptor: ManaClassDescriptor) {
  const { element, ...classData } = classDescriptor

  if (!controllers.hasOwnProperty(classData.controller)) {
    console.log(`There's no controller with name "${classData.controller}"!`)
    return
  }

  if (classData.target !== undefined) {
    registerTargetElement(classDescriptor)
    return
  }

  registerControllerElement(classDescriptor)
}

function registerControllerElement(classDescriptor: ManaClassDescriptor) {
  const elementData: ElementInformation = {
    controller: classDescriptor.controller,
    context: createControllerContext(classDescriptor.controller, classDescriptor.element),
    targets: []
  }

  elements.set(classDescriptor.element, elementData)

  console.log(elementData)

  if (typeof elementData.context.config.onInit === 'function') {
    elementData.context.config.onInit(elementData.context)
  }
}

function registerTargetElement(classDescriptor: ManaClassDescriptor) {

}

function createControllerContext(
  controllerName: string,
  element: HTMLElement
): ControllerContext {
  const controllerConfig = controllers[controllerName]
  const data = {}
  const property: { [x: string]: ControllerProperty<any> } = {}
  const target: { [x: string]: ControllerTargetSet } = {}

  Object.keys(controllerConfig.properties).forEach(currentPropertyName => {
    const currentPropertyConfig = controllerConfig.properties[currentPropertyName]

    property[currentPropertyName] = {
      value: element.getAttribute(`data-${controllerName}.${currentPropertyName}`)
        || currentPropertyConfig.default,
      onChange () {}
    }
  })

  Object.keys(controllerConfig.targets).forEach(currentTargetName => {
    const currentTargetConfig = controllerConfig.targets[currentTargetName]

    target[currentTargetName] = {
      targets: [],
      firstTarget: null, // FIXME: implement
      elements: [],
      firstElement: null, // FIXME: implement
      once() {},
      on() {},
      off() {},
      onAdded() {},
      onRemoved() {}
    }
  })

  return {
    get config() { return controllerConfig },
    get data() { return data },
    get property() { return property },
    get target() { return target },
    get element() { return element },
    get headElement() { return headElement },
    get bodyElement() { return bodyElement }
  }
}

export function unregisterElement(classDescriptor: ManaClassDescriptor) {
  // FIXME: implement
}