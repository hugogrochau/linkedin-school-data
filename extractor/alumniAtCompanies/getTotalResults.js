import numbro from 'numbro'

const idsToQueryPart = (ids) => {
  const joinedIds = ids.join(',')
  return `[${joinedIds}]`
}

const buildSearchUrl = (companies, schools) => {
  const companyIds = idsToQueryPart(companies)
  const schoolIds = idsToQueryPart(schools)
  const searchUrl = encodeURI(`https://www.linkedin.com/search/results/people/?company=&facetCurrentCompany=${companyIds}&facetSchool=${schoolIds}&firstName=&lastName=&origin=FACETED_SEARCH&school=&title=`)

  return searchUrl
}

export const getTotalResults = async (page, companies, schools) => {
  const searchUrl = buildSearchUrl(companies, schools)
  await page.goto(searchUrl)

  const searchResultsTotalSelector = 'h3.search-results__total'
  await page.waitForSelector(searchResultsTotalSelector)

  const searchResultsTotal = await page.$eval(searchResultsTotalSelector, el => el.innerHTML)
  const matchResults = searchResultsTotal.match(/^\s*Showing ([,\d]*) results\s*$/)

  const numberOfResults = numbro(matchResults[1]).value()

  return numberOfResults
}
