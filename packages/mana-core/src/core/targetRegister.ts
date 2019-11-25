import { TargetNameElementsMap } from './handleNodeChange'
import { TargetOptions, TargetInstance } from '../api/registerTarget'

// #region types
export interface TargetDescriptor {
  options: TargetOptions|null
  elements: WeakSet<HTMLElement>
}

export interface TargetElementMap {
  [targetName: string]: TargetDescriptor
}
// #endregion types

const targetElementMap: TargetElementMap = {}
const elementTargetInstanceMap =
  new WeakMap<HTMLElement, TargetInstance<TargetOptions>>()

function ensureTargetNameInRegister (targetName: string): void {
  if (!(targetName in targetElementMap)) {
    targetElementMap[targetName] = { elements: new WeakSet(), options: null }
  }
}

export function addNewElements (
  targetName: string,
  elements: HTMLElement[]
): void {
  ensureTargetNameInRegister(targetName)

  for (const element of elements) {
    targetElementMap[targetName].elements.add(element)
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

  targetElementMap[targetName].options = targetOptions
}
