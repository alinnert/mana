import { TargetNameElementsMap } from './handleNodeChange'
import { TargetOptions } from '../api/registerTarget'

export interface TargetDescriptor {
  options: TargetOptions|null
  elements: WeakSet<HTMLElement>
}

export interface TargetRegister {
  [targetName: string]: TargetDescriptor
}

export const targetRegister: TargetRegister = {}

function ensureTargetNameInRegister (targetName: string): void {
  if (!(targetName in targetRegister)) {
    targetRegister[targetName] = { elements: new WeakSet(), options: null }
  }
}

export function addNewElements (
  targetName: string,
  elements: HTMLElement[]
): void {
  ensureTargetNameInRegister(targetName)

  for (const element of elements) {
    targetRegister[targetName].elements.add(element)
  }
}

export function addElementsByTargetElementsMap (
  targetElementMap: TargetNameElementsMap
): void {
  Object.entries(targetElementMap)
    .forEach(([targetName, elements]) => {
      addNewElements(targetName, elements)
    })
}

export function addNewTarget (
  targetName: string,
  targetOptions: TargetOptions
): void {
  ensureTargetNameInRegister(targetName)

  targetRegister[targetName].options = targetOptions
}
