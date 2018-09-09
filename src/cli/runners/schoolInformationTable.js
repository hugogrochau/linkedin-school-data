/* eslint-disable import/first */

import fs from 'fs'
import path from 'path'
import { logger } from '../../logger'

import { schoolInformationTable as run } from '../../formatter/schoolInformationTable'

export const schoolInformationTable = async () => {
  if (!fs.existsSync(path.resolve('output', 'schoolData.json'))) {
    logger.error('Please run schoolData before running schoolInformationTable')
    process.exit(1)
  }

  const schoolData = require('../../../output/schoolData.json')

  const output = await run(schoolData)

  fs.writeFileSync(path.resolve('output', 'schoolInformationTable.csv'), output)
}
