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
      logger.warn(`Couldn't fetch company data for companyId ${companyId}`, err)
    }
  }

  if (config.closeBrowser) {
    await browser.close()
  }

  return companies
}

export const fetchCompanyData = async (page, companyId) => {
  logger.debug(`Fetching company (id:${companyId}) data`)

  const companyUrl = `https://www.linkedin.com/company/${companyId}/`
  await page.goto(companyUrl)

  await page.waitForSelector(nameSelector, { timeout: 5000 })
  const name = await getText(page, nameSelector)

  const industries = await getIndustries(page, name)

  const location = await getLocation(page, name)

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

const isSchool = async (page) => {
  const url = await page.url()
  return url.includes('linkedin.com/school')
}

const getIndustries = async (page, name) => {
  const isSchoolPage = await isSchool(page)
  if (isSchoolPage) {
    logger.debug(`Skipping industries for school ${name}`)
    return null
  }

  try {
    const industries = await getText(page, industriesSelector)
    return industries
  } catch (err) {
    logger.warn(`Couldn't get industries for ${name}`, err)
    return null
  }
}

const getLocation = async (page, name) => {
  const isSchoolPage = await isSchool(page)

  try {
    const location = isSchoolPage
      ? await getText(page, schoolLocationSelector)
      : await getText(page, companyLocationSelector)

    return location
  } catch (err) {
    logger.warn(`Couldn't get location for ${name}`, err)
    return null
  }
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
