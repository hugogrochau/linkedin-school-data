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

const start = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US'], headless: false })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1080
  })

  await login(page, config.email, config.password)

  const topCompaniesOfSchoolsResults = await topCompaniesOfSchools(page, config.schools)
  fs.writeFileSync(path.resolve('output', 'topCompaniesOfSchools.json'), JSON.stringify(topCompaniesOfSchoolsResults))

  // const alumniAtCompaniesResult = await alumniAtCompanies(page, ['10582', '10693'], ['1033', '162402'])
  // fs.writeFileSync(path.resolve('output', alumniAtCompanies.json'), JSON.stringify(alumniAtCompaniesResult))

  await browser.close()
}

start()
