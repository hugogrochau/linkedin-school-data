import { getTotalResults } from './getTotalResults'
import fs from 'fs'
import path from 'path'

export const alumniAtCompanies = async (page, schoolIds, companyIds) => {
  const schools = {}

  for (const schoolId of schoolIds) {
    console.info(`Started fetching companies for school ${schoolId}`)
    const numberOfAlumni = await getAlumniAtCompaniesBySchool(page, schoolId, companyIds)
    schools[schoolId] = numberOfAlumni

    console.info(`Finished fetching companies for school ${schoolId}`)
    fs.writeFileSync(path.resolve('output', `alumniAtCompaniesFromSchoolUntil${schoolId}.json`), JSON.stringify(schools, null, 2))
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
