import fs from 'fs'
import path from 'path'

import { getTotalResults } from './getTotalResults'
import { launchBrowser } from '../launchBrowser'
import { login } from '../login'
import config from '../../../config.json'

export const alumniAtCompanies = async (schoolIds, companyIds) => {
  const { page, browser } = await launchBrowser()
  await login(page, config.email, config.password)
  const schools = {}

  for (const schoolId of schoolIds) {
    console.info(`Started fetching companies for school ${schoolId}`)
    const numberOfAlumni = await getAlumniAtCompaniesBySchool(page, schoolId, companyIds)
    schools[schoolId] = numberOfAlumni

    console.info(`Finished fetching companies for school ${schoolId}`)
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
    console.info(`Started fetching alumni for company ${companyId} and school ${schoolId}`)
    const total = await getTotalResults(page, [companyId], [schoolId])
    companies[companyId] = total
    console.info(`Finished fetching alumni for company ${companyId} and school ${schoolId} with ${total} results`)
  }

  return companies
}
