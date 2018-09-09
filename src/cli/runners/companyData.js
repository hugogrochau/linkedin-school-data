/* eslint-disable import/first */

import fs from 'fs'
import path from 'path'
import { logger } from '../../logger'

import { companyData as run } from '../../extractor/companyData'

export const companyData = async () => {
  if (!fs.existsSync(path.resolve('output', 'topCompaniesOfSchools.json'))) {
    logger.error('Please run topCompaniesOfSchools before running companydata')
    process.exit(1)
  }

  const topCompaniesOfSchools = require('../../../output/topCompaniesOfSchools.json')
  const companyIds = topCompaniesOfSchools.uniqueCompanyIds

  const output = await run(companyIds)

  fs.writeFileSync(path.resolve('output', 'companyData.json'), JSON.stringify(output, null, 2))
}
