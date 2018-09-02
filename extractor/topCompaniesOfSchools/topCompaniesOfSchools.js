import * as R from 'ramda'
import { getCompanyIdsBySchoolName } from './getCompanyIdsBySchoolName'
import { getSchoolIdByName } from './getSchoolIdByName'

export const topCompaniesOfSchools = async (page, schoolNames) => {
  const schools = {}
  for (const schoolName of schoolNames) {
    const id = await getSchoolIdByName(page, schoolName)
    const companyIds = await getCompanyIdsBySchoolName(page, schoolName)
    schools[schoolName] = { id, companyIds }
  }

  const uniqueCompanyIds = R.pipe(
    R.values,
    R.pluck('companyIds'),
    R.flatten,
    R.uniq
  )(schools)

  return { schools, uniqueCompanyIds }
}
