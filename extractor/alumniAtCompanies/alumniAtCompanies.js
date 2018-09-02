import { getTotalResults } from './getTotalResults'

export const alumniAtCompanies = async (page, schoolIds, companyIds) => {
  const schools = {}

  for (const schoolId of schoolIds) {
    const numberOfAlumni = await getAlumniAtCompaniesBySchool(page, schoolId, companyIds)
    schools[schoolId] = numberOfAlumni
  }

  return schools
}

const getAlumniAtCompaniesBySchool = async (page, schoolId, companyIds) => {
  const companies = {}

  for (const companyId of companyIds) {
    const total = await getTotalResults(page, [companyId], [schoolId])
    companies[companyId] = total
  }

  return companies
}
