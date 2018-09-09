import * as R from 'ramda'

import config from '../../../config.json'
import { logger } from '../../logger'
import { launchBrowser } from '../launchBrowser'
import { getCompanyIdsBySchoolSlug } from './getCompanyIdsBySchoolSlug'
import { getSchoolDataBySlug } from './getSchoolDataBySlug'
import { login } from '../login'

export const schoolData = async (schoolSlugs) => {
  const { page, browser } = await launchBrowser()
  await login(page, config.email, config.password)

  const schools = {}
  for (const schoolSlug of schoolSlugs) {
    logger.debug(`Fetching school data for ${schoolSlug}`)

    const schoolData = await getSchoolDataBySlug(page, schoolSlug)
    const companyIds = await getCompanyIdsBySchoolSlug(page, schoolSlug)
    const extendedSchoolData = { slug: schoolSlug, ...schoolData, companyIds }

    schools[schoolData.id] = extendedSchoolData
    logger.debug(`Fetched school data for ${schoolSlug}`, extendedSchoolData)
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
