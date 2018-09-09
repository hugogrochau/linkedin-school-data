/* eslint-disable import/first */
import fs from 'fs'
import path from 'path'
import { logger } from '../logger'
if (!fs.existsSync(path.resolve('config.json'))) {
  logger.error('Please copy config.example.json to config.json with the correct data')
  process.exit(1)
}

import commander from 'commander'
import config from '../../config.json'
import runners from './runners'

export const cli = async () => {
  commander.version(config.version)
    .arguments('<runner>')
    .option('-r --runner <runner>', 'Runner name')
    .parse(process.argv)

  const runner = commander.runner || commander.args[0]

  if (!runner) {
    logger.error('Runner is a required parameter')
    process.exit(1)
  }

  const startTime = Date.now()

  logger.info(`Running ${runner}`)
  await runners[runner]()

  const offsetInSeconds = (Date.now() - startTime) / 1000
  logger.info(`Finished running ${runner} in ${offsetInSeconds}`)
}
