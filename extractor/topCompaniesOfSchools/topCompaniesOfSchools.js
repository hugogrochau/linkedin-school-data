import { getCompanyIdsBySchoolName } from './getCompanyIdsBySchoolName'

export const topCompaniesOfSchools = async (page, schools) => {
  await getCompanyIdsBySchoolName(page, schools[0])
}
