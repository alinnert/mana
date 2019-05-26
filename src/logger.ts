export enum LogType {
  EnvironmentError,
  ConfigError
}

function getMessageTitle(type: LogType) {
  const messages = {
    [LogType.EnvironmentError]: () => 'Wrong environment',
    [LogType.ConfigError]: () => 'Error in controller config',
  }

  return messages[type]()
}

export function log(type: LogType, message: string) {
  const title = getMessageTitle(type)
  const styles = 'color: palegreen; background-color: darkolivegreen; border-radius: 3px; padding: 2px 0;'
  console.error(`%c Mana: ${title} %c ${message}`, styles, '')
}