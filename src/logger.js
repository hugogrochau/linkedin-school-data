import chalk from 'chalk'

export const logger = {
  debug: (message, ...logObjects) => console.debug(`${chalk.bold.blue('DEBUG')} ${message} ${formatLogObjects(logObjects)}`),
  info: (message, ...logObjects) => console.info(`${chalk.bold.green('INFO')} ${message} ${formatLogObjects(logObjects)}`),
  warn: (message, ...logObjects) => console.warn(`${chalk.bold.yellow('WARN')} ${message} ${formatLogObjects(logObjects)}`),
  error: (message, ...logObjects) => console.error(`${chalk.bold.red('ERROR')} ${message} ${formatLogObjects(logObjects)}`)
}

const formatLogObjects = (logObjects) => {
  if (!logObjects || !logObjects.length || logObjects.length === 0) {
    return ''
  }

  return logObjects.reduce((accumulator, currentValue) => {
    if (currentValue instanceof Error) {
      return accumulator.concat(currentValue.stack)
    }

    const stringifiedCurrentValue = JSON.stringify(currentValue, null, 2)

    return accumulator.concat('\n', stringifiedCurrentValue)
  }, '')
}
