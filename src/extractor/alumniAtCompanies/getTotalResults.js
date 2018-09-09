import numbro from 'numbro'

const idsToQueryPart = (ids) => {
  const joinedIds = ids.join(',')
  return `[${joinedIds}]`
}

const buildSearchUrl = (companies, schools, useITFilters) => {
  const itIndustries = [96, 4, 6, 109, 118, 3, 5, 84]
  const industryIds = idsToQueryPart(itIndustries)
  const companyIds = idsToQueryPart(companies)
  const schoolIds = idsToQueryPart(schools)

  const informationTechnologyFilters = useITFilters
    ? `&facetIndustry=${industryIds}`
    : ''

  const searchUrl = encodeURI(`https://www.linkedin.com/search/results/people/?company=&facetCurrentCompany=${companyIds}${informationTechnologyFilters}&facetSchool=${schoolIds}&firstName=&lastName=&origin=FACETED_SEARCH&school=&title=`)

  return searchUrl
}

export const getTotalResults = async (page, companies, schools, options) => {
  const searchUrl = buildSearchUrl(companies, schools, options.useITFilters)
  await page.goto(searchUrl)

  const searchResultsPageSelector = '.search-results-page'
  const searchResultsTotalSelector = 'h3.search-results__total'
  await page.waitForSelector(searchResultsPageSelector)

  try {
    const searchResultsTotal = await page.$eval(searchResultsTotalSelector, el => el.innerHTML)
    const matchResults = searchResultsTotal.match(/^\s*Showing ([,\d]*) results?\s*$/)

    const numberOfResults = numbro(matchResults[1]).value()

    return numberOfResults
  } catch (err) {
    return 0
  }
}
