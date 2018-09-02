import fs from 'fs'
import { logger } from './logger'
if (!fs.existsSync('./config.json')) {
  logger.error('Please copy config.example.json to config.json with the correct data')
  process.exit(1)
}

import { extract } from './extract' // eslint-disable-line import/first
extract()
