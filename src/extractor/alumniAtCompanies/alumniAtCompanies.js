import fs from 'fs'
import path from 'path'

import { logger } from '../../logger'
import { getTotalResults } from './getTotalResults'
import { launchBrowser } from '../launchBrowser'
import { login } from '../login'
import config from '../../../config.json'

export const alumniAtCompanies = async (schoolIds, companyIds) => {
  const { page, browser } = await launchBrowser()
  await login(page, config.email, config.password)
  const schools = {}

  for (const schoolId of schoolIds) {
    logger.debug(`Started fetching alumnis for school ${schoolId}`)
    const alumniFromSchool = await getAlumniAtCompaniesBySchool(page, schoolId, companyIds)
    schools[schoolId] = alumniFromSchool

    logger.debug(`Finished fetching alumnis for school ${schoolId}`, alumniFromSchool)

    fs.writeFileSync(path.resolve('output', `alumniAtCompaniesFromSchoolUntil${schoolId}.json`), JSON.stringify(schools, null, 2))
  }

  if (config.closeBrowser) {
    await browser.close()
  }

  return schools
}

const getAlumniAtCompaniesBySchool = async (page, schoolId, companyIds) => {
  const companies = {}

  for (const companyId of companyIds) {
    logger.debug(`Started fetching alumni for company ${companyId} and school ${schoolId}`)
    const totalResults = await getTotalResults(page, [companyId], [schoolId])
    companies[companyId] = totalResults
    logger.debug(`Finished fetching alumni for company ${companyId} and school ${schoolId} with ${totalResults} results`)
  }

  return companies
}
