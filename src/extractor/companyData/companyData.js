import numbro from 'numbro'

import config from '../../../config.json'
import { getText } from '../utils'
import { logger } from '../../logger'
import { launchBrowser } from '../launchBrowser'
import { login } from '../login'

const nameSelector = 'h1.org-top-card-module__name'
const industriesSelector = 'span.company-industries'
const companyLocationSelector = 'span.org-top-card-module__location'
const schoolLocationSelector = 'span.school-location'

export const companyData = async (companyIds) => {
  const { page, browser } = await launchBrowser()
  await login(page, config.email, config.password)
  const companies = {}

  for (const companyId of companyIds) {
    try {
      const company = await fetchCompanyData(page, companyId)

      companies[companyId] = company
    } catch (err) {
      logger.warn(`Couldn't fetch company data for companyId ${companyId}`)
    }
  }

  if (config.closeBrowser) {
    await browser.close()
  }

  return companies
}

export const fetchCompanyData = async (page, companyId) => {
  logger.debug(`Fetching company data for id: ${companyId}`)

  const companyUrl = `https://www.linkedin.com/company/${companyId}/`
  await page.goto(companyUrl)

  await page.waitForSelector(nameSelector, { timeout: 5000 })
  const name = await getText(page, nameSelector)
  const industries = await getText(page, industriesSelector)
  const location = await getText(page, companyLocationSelector) || await getText(page, schoolLocationSelector)
  const followers = await getFollowers(page, name)
  const employees = await getEmployees(page, name)

  const companyData = {
    name,
    industries,
    location,
    followers,
    employees
  }

  logger.debug(`Fetched company data`, companyData)

  return companyData
}

const getEmployees = async (page, name) => {
  const employeesSelector = 'a.org-company-employees-snackbar__details-highlight > strong'
  const employeesText = await getText(page, employeesSelector, /\s*See all ([,\d]*) employ\s*/)

  if (!employeesText) {
    logger.warn(`Couldn't get employees for company ${name}`)
    return 0
  }

  return numbro(employeesText).value()
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
