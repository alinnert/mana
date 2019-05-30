import { ControllerConfig, ControllerList } from './ControllerTypes'

const controllers: ControllerList = {}

// @ts-ignore
window.manaControllers = controllers

export function registerController(config: ControllerConfig) {
  controllers[config.name] = config
}
