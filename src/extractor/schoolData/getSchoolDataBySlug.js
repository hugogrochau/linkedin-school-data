import numbro from 'numbro'
import { getText } from '../utils'
import { logger } from '../../logger'

const nameSelector = 'h1.org-top-card-module__name'

const locationSelector = 'span.school-location'

const followersSelector = 'span.org-top-card-module__followers-count'
const followersRegex = /\s*([,\d]*) follower\s*/

const employeesSelector = 'a.org-company-employees-snackbar__details-highlight > strong'
const employeesRegex = /\s*See all ([,\d]*) employ\s*/

const alumniSelector = 'span.school-alumni'
const alumniRegex = /\s*([,\d]*)\+ alumni\s*/

export const getSchoolDataBySlug = async (page, schoolName) => {
  const schoolUrl = `https://linkedin.com/school/${schoolName}/`

  await page.goto(schoolUrl)

  await page.waitForSelector(nameSelector)

  const name = await getText(page, nameSelector)
  const id = await getSchoolId(page)
  const location = await getText(page, locationSelector)
  const followers = await getNumberFromPage(page, schoolName, 'followers', followersSelector, followersRegex)
  const employees = await getNumberFromPage(page, schoolName, 'employees', employeesSelector, employeesRegex)
  const alumni = await getNumberFromPage(page, schoolName, 'alumni', alumniSelector, alumniRegex)

  const schoolData = {
    name,
    id,
    location,
    followers,
    employees,
    alumni
  }

  return schoolData
}

const getSchoolId = async (page) => {
  const schoolIdRegex = /headquarter","school":"urn:li:fs_normalized_school:(\d*)/
  const content = await page.content()
  const [, schoolId] = content.match(schoolIdRegex)

  return parseInt(schoolId, 10)
}

const getNumberFromPage = async (page, schoolName, type, selector, regex) => {
  const text = await getText(page, selector, regex)

  if (!text) {
    logger.warn(`Couldn't get number of ${type} for school ${schoolName}`)
    return 0
  }

  return numbro(text).value()
}
