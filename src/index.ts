import { startObserver } from './startObserver';
import { checkEnvironment } from './checkEnvironment';

export * from './defineController'
export * from './propertyTypes/index'

if (checkEnvironment()) {
  startObserver()
}