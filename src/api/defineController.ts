import { ControllerConfig } from '../core/ControllerTypes'
import { registerController } from '../core/controllerElementStore'
import { log, LogType } from '../core/logger'

export function defineController(userConfig: ControllerConfig): void {
  if (validateUserConfig(userConfig)) {
    registerController(userConfig)
  }
}

function validateUserConfig(config: ControllerConfig): boolean {
  let message = ''

  if (typeof config !== 'object') {
    message = 'The first parameter of "defineController" must be a configuration object.'
  } else if (typeof config.name !== 'string') {
    message = 'Property "name" must be a string.'
  } else if (config.name === '') {
    message = 'Property "name" must not be an empty string.'
  } else if (typeof config.element !== 'undefined' && typeof config.element !== 'string' && !Array.isArray(config.element)) {
    message = 'Property "element" (optional) must be a string or an array of strings.'
  } else if (typeof config.properties !== 'undefined' && typeof config.properties !== 'object') {
    message = 'Property "properties" (optional) must be an object.'
  } else if (typeof config.targets !== 'undefined' && typeof config.targets !== 'object') {
    message = 'Property "targets" (optional) must be an object.'
  }

  if (message !== '') {
    log(LogType.ConfigError, message)
    return false
  }

  return true
}
