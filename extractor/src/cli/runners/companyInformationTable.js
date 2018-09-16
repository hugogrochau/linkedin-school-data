/* eslint-disable import/first */

import fs from 'fs'
import path from 'path'
import { logger } from '../../logger'

import { companyInformationTable as run } from '../../formatter/companyInformationTable'

export const companyInformationTable = async () => {
  if (!fs.existsSync(path.resolve('output', 'schoolData.json'))) {
    logger.error('Please run companyData before running companyInformationTable')
    process.exit(1)
  }

  const companyData = require('../../../output/companyData.json')

  const output = await run(companyData)

  fs.writeFileSync(path.resolve('output', 'companyInformationTable.csv'), output)
}
