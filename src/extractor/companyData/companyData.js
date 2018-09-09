import numbro from 'numbro'

import config from '../../../config.json'
import { getText } from '../utils'
import { logger } from '../../logger'
import { launchBrowser } from '../launchBrowser'
import { login } from '../login'

export const companyData = async (companyIds) => {
  const { page, browser } = await launchBrowser()
  await login(page, config.email, config.password)
  const companies = {}

  for (const companyId of companyIds) {
    const company = await handleCompany(page, companyId)
    companies[companyId] = company
  }

  if (config.closeBrowser) {
    await browser.close()
  }

  return companies
}

export const handleCompany = async (page, companyId) => {
  logger.debug(`Fetching company data for id: ${companyId}`)

  const companyUrl = `https://www.linkedin.com/company/${companyId}/`
  await page.goto(companyUrl)

  const nameSelector = 'h1.org-top-card-module__name'
  const industriesSelector = 'span.company-industries'
  const companyLocationSelector = 'span.org-top-card-module__location'
  const schoolLocationSelector = 'span.school-location'

  await page.waitForSelector(nameSelector)

  const name = await getText(page, nameSelector)
  const industries = await getText(page, industriesSelector)
  const location = await getText(page, companyLocationSelector) || await getText(page, schoolLocationSelector)
  const followers = await getFollowers(page, name)
  const totalEmployees = await getTotalEmployees(page, name)

  const companyData = {
    name,
    industries,
    location,
    followers,
    totalEmployees
  }

  logger.debug(`Fetched company data companyData`, companyData)

  return companyData
}

const getTotalEmployees = async (page, name) => {
  const totalEmployeesSelector = 'a.org-company-employees-snackbar__details-highlight > strong'
  const totalEmployeesText = await getText(page, totalEmployeesSelector, /\s*See all ([,\d]*) employ\s*/)

  if (!totalEmployeesText) {
    logger.warn(`Couldn't get total employees for company ${name}`)
    return 0
  }

  return numbro(totalEmployeesText).value()
}

const getFollowers = async (page, name) => {
  const followersSelector = 'span.org-top-card-module__followers-count'
  const followersText = await getText(page, followersSelector, /\s*([,\d]*) follower\s*/)

  if (!followersText) {
    logger.warn(`Couldn't get followers for company ${name}`)
    return 0
  }

  return numbro(followersText).value()
}
