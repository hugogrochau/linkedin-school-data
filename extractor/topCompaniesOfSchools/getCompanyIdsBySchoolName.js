import querystring from 'querystring'

const buildAlumniUrl = (schoolName) => `https://linkedin.com/school/${schoolName}/alumni/`
const companiesSelector = '.org-alumni-bar-graph-module__current-company > .insight-container > .org-bar-graph-element--is-selectable'

export const getCompanyIdsBySchoolName = async (page, schoolName) => {
  const alumniUrl = buildAlumniUrl(schoolName)
  await page.goto(alumniUrl)
  await page.waitForSelector(companiesSelector)
  const companyElements = await page.$$(companiesSelector)
  const numberOfCompanies = companyElements.length

  const companyIds = []
  for (let i = 0; i < numberOfCompanies; i++) {
    const companyId = await getCompanyId(page, i)
    companyIds.push(companyId)
  }

  return companyIds
}

const getCompanyId = async (page, index) => {
  await page.waitForSelector(companiesSelector)
  const companyElements = await page.$$(companiesSelector)
  const companyElement = companyElements[index]

  await companyElement.click()
  await page.waitForSelector('.org-alumni-insights__selected-filter-item')

  const url = await page.url()
  const queryPart = url.split('?')[1]
  const { facetCurrentCompany } = querystring.parse(queryPart)

  await page.goBack()

  return parseInt(facetCurrentCompany, 10)
}
