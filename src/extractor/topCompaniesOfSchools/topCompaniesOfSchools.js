import * as R from 'ramda'

import config from '../../../config.json'
import { launchBrowser } from '../launchBrowser'
import { getCompanyIdsBySchoolName } from './getCompanyIdsBySchoolName'
import { getSchoolIdByName } from './getSchoolIdByName'
import { login } from '../login'

export const topCompaniesOfSchools = async (schoolNames) => {
  const { page, browser } = await launchBrowser()
  await login(page, config.email, config.password)

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

  if (config.closeBrowser) {
    await browser.close()
  }

  return { schools, uniqueCompanyIds }
}
