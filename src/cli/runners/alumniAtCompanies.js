/* eslint-disable import/first */

import fs from 'fs'
import path from 'path'
import { logger } from '../../logger'

import { alumniAtCompanies as run } from '../../extractor/alumniAtCompanies'

export const alumniAtCompanies = async () => {
  if (!fs.existsSync(path.resolve('output', 'topCompaniesOfSchools.json'))) {
    logger.error('Please run topCompaniesOfSchools before running alumniAtCompanies')
    process.exit(1)
  }

  const topCompaniesOfSchools = require('../../../output/topCompaniesOfSchools.json')
  const schoolIds = Object.values(topCompaniesOfSchools.schools).map(school => school.id)
  const companyIds = topCompaniesOfSchools.uniqueCompanyIds

  const output = await run(schoolIds, companyIds)

  fs.writeFileSync(path.resolve('output', 'alumniAtCompanies.json'), JSON.stringify(output, null, 2))
}
