/* eslint-disable import/first */

import fs from 'fs'
import path from 'path'
import { logger } from './logger'
if (!fs.existsSync('./config.json')) {
  logger.error('Please copy config.example.json to config.json with the correct data')
  process.exit(1)
}

import puppeteer from 'puppeteer'
import config from '../config'
import { login } from './login'
// import { alumniAtCompanies } from './alumniAtCompanies'
import { topCompaniesOfSchools } from './topCompaniesOfSchools'
// import topCompaniesOfSchools from '../output/topCompaniesOfSchools.json'

const start = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US'], headless: false })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1080
  })

  await login(page, config.email, config.password)

  const topCompaniesOfSchoolsResults = await topCompaniesOfSchools(page, config.schools)
  fs.writeFileSync(path.resolve('output', 'topCompaniesOfSchools.json'), JSON.stringify(topCompaniesOfSchoolsResults, null, 2))

  // const schoolIds = Object.values(topCompaniesOfSchools.schools).map(school => school.id)
  // const companyIds = topCompaniesOfSchools.uniqueCompanyIds

  // const alumniAtCompaniesResult = await alumniAtCompanies(page, schoolIds, companyIds)

  // fs.writeFileSync(path.resolve('output', 'alumniAtCompanies.json'), JSON.stringify(alumniAtCompaniesResult, null, 2))

  await browser.close()
}

start()
