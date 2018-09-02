import querystring from 'querystring'

const buildSchoolUrl = (schoolName) => `https://linkedin.com/school/${schoolName}/`

export const getSchoolIdByName = async (page, schoolName) => {
  const schoolUrl = buildSchoolUrl(schoolName)
  await page.goto(schoolUrl)

  const moreDetailsSelector = '.org-company-employees-snackbar__details-highlight'
  await page.waitForSelector(moreDetailsSelector)
  await page.click(moreDetailsSelector)
  await page.waitForNavigation()

  const url = await page.url()
  const queryPart = decodeURI(url).split('?')[1]
  const parseResult = querystring.parse(queryPart)
  const { facetSchool } = parseResult
  const cleanSchoolString = facetSchool.replace(/[[\]"]/gi, '')

  return parseInt(cleanSchoolString, 10)
}
