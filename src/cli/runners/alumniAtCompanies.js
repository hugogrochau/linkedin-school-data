/* eslint-disable import/first */

import fs from 'fs'
import path from 'path'
import { logger } from '../../logger'

import { alumniAtCompanies as run } from '../../extractor/alumniAtCompanies'

export const alumniAtCompanies = async () => {
  if (
    !fs.existsSync(path.resolve('output', 'schoolData.json')) ||
    !fs.existsSync(path.resolve('output', 'companyData.json'))
  ) {
    logger.error('Please run schoolData and companyData before running alumniAtCompanies')
    process.exit(1)
  }

  const schoolData = require('../../../output/schoolData.json')
  const companyData = require('../../../output/companyData.json')
  const schoolIds = Object.keys(schoolData)
  const companyIds = Object.keys(companyData)

  const output = await run(schoolIds, companyIds)

  fs.writeFileSync(path.resolve('output', 'alumniAtCompanies.json'), JSON.stringify(output, null, 2))
}
