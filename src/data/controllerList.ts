import { ControllerConfig } from '../types/ControllerConfig'

const controllers: ControllerConfig[] = []

export function registerController (config: ControllerConfig) {
  controllers.push(config)
}