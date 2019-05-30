import { initObserver } from './core/domObserver'
import { checkEnvironment } from './core/checkEnvironment'

export * from './api/defineController'
export * from './api/propertyTypes/index'

if (checkEnvironment()) {
  initObserver()
}