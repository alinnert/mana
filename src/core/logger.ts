export enum LogType {
  DebugInformation,
  EnvironmentError,
  ConfigError,
}

function getMessageTitle(type: LogType) {
  const messages = {
    [LogType.EnvironmentError]: () => 'Wrong environment',
    [LogType.ConfigError]: () => 'Error in controller config',
    [LogType.DebugInformation]: () => 'Debug'
  }

  return messages[type]()
}

function getBackgroundColor(type: LogType) {
  const colors = {
    [LogType.EnvironmentError]: () => 'darkolivegreen',
    [LogType.ConfigError]: () => 'darkolivegreen',
    [LogType.DebugInformation]: () => 'darkslateblue',
  }

  return colors[type]()
}

function getTextColor (type: LogType) {
  const colors = {
    [LogType.EnvironmentError]: () => 'palegreen',
    [LogType.ConfigError]: () => 'palegreen',
    [LogType.DebugInformation]: () => 'thistle',
  }

  return colors[type]()
}

export function log(type: LogType, message: string) {
  const title = getMessageTitle(type)
  const styles = `color: ${getTextColor(type)}; background-color: ${getBackgroundColor(type)}; border-radius: 3px; padding: 2px 0;`

  if ([LogType.ConfigError, LogType.EnvironmentError].includes(type)) {
    console.error(`%c Mana | ${title} %c ${message}`, styles, '')
  } else if ([LogType.DebugInformation].includes(type)) {
    console.log(`%c Mana | ${title} %c ${message}`, styles, '')
  }
}