/* eslint-disable import/first */

import fs from 'fs'
import path from 'path'
import { logger } from '../../logger'

import { companyData as run } from '../../extractor/companyData'

export const companyData = async () => {
  if (!fs.existsSync(path.resolve('output', 'companyIds.json'))) {
    logger.error('Please run schoolData before running companydata')
    process.exit(1)
  }

  const companyIds = require('../../../output/companyIds.json')

  const output = await run(companyIds)

  fs.writeFileSync(path.resolve('output', 'companyData.json'), JSON.stringify(output, null, 2))
}
