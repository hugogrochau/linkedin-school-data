import puppeteer from 'puppeteer'
import config from '../config'
import numbro from 'numbro'

const fillOutField = async (page, selector, value) => {
  await page.click(selector)
  await page.keyboard.type(value)
}

const login = async (page) => {
  const loginUrl = 'https://www.linkedin.com/uas/login?_l=en'
  await page.goto(loginUrl)

  await fillOutField(page, 'input#session_key-login', config.email)
  await fillOutField(page, 'input#session_password-login', config.password)

  await page.click('input#btn-primary')
  await page.waitForNavigation()
}

const getTotal = async (page, url) => {
  await page.goto(url)

  const searchResultsTotalSelector = 'h3.search-results__total'
  await page.waitForSelector(searchResultsTotalSelector)

  const searchResultsTotal = await page.$eval(searchResultsTotalSelector, el => el.innerHTML)
  const matchResults = searchResultsTotal.match(/^\s*Showing ([,\d]*) results\s*$/)

  const numberOfResults = numbro(matchResults[1]).value()

  return numberOfResults
}

export const extract = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US'], headless: false })
  const page = await browser.newPage()

  await login(page)
  const searchUrl = 'https://www.linkedin.com/search/results/people/?company=&facetCurrentCompany=%5B%22165595%22%5D&facetSchool=%5B%2210582%22%5D&firstName=&lastName=&origin=FACETED_SEARCH&school=&title='
  const total = await getTotal(page, searchUrl)
  console.info(`Total: ${total}`)
  await page.screenshot({ path: 'page.png' })

  await browser.close()
}
