/* eslint-disable import/first */

import fs from 'fs'
import { logger } from './logger'
if (!fs.existsSync('./config.json')) {
  logger.error('Please copy config.example.json to config.json with the correct data')
  process.exit(1)
}

import puppeteer from 'puppeteer'
import { login } from './login'
import { alumniAtCompanies } from './alumniAtCompanies'

const start = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US'], headless: false })
  const page = await browser.newPage()

  await login(page)

  const alumniAtCompaniesResult = await alumniAtCompanies(page, ['10582', '10693'], ['1033', '162402'])

  fs.writeFileSync('alumniAtCompanies.json', JSON.stringify(alumniAtCompaniesResult))

  await browser.close()
}

start()
