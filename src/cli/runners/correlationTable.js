/* eslint-disable import/first */

import fs from 'fs'
import path from 'path'
import { logger } from '../../logger'

import { correlationTable as run } from '../../formatter/correlationTable'

export const correlationTable = async () => {
  if (
    !fs.existsSync(path.resolve('output', 'schoolData.json')) ||
    !fs.existsSync(path.resolve('output', 'companyData.json')) ||
    !fs.existsSync(path.resolve('output', 'alumniAtCompanies.json'))
  ) {
    logger.error('Please run schoolData, companyData and alumniAtCompanies before running correlationTable')
    process.exit(1)
  }

  const schoolData = require('../../../output/schoolData.json')
  const companyData = require('../../../output/companyData.json')
  const alumniAtCompanies = require('../../../output/alumniAtCompanies.json')

  const output = await run(schoolData, companyData, alumniAtCompanies)

  fs.writeFileSync(path.resolve('output', 'correlationTable.csv'), output)
}
