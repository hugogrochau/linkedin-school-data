import config from '../config'
import { fillOutField } from './utils'

export const login = async (page) => {
  const loginUrl = 'https://www.linkedin.com/uas/login?_l=en'
  await page.goto(loginUrl)

  await fillOutField(page, 'input#session_key-login', config.email)
  await fillOutField(page, 'input#session_password-login', config.password)

  await page.click('input#btn-primary')
  await page.waitForNavigation()
}
