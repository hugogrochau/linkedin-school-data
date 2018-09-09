export const fillOutField = async (page, selector, value) => {
  await page.click(selector)
  await page.keyboard.type(value)
}

export const getText = async (page, selector, regex) => {
  try {
    const result = await page.$eval(selector, el => el.textContent)

    if (!regex) {
      return result.trim()
    }

    const matchResults = result.match(regex)
    if (!matchResults) {
      return null
    }

    return matchResults[1].trim()
  } catch (err) {
    return null
  }
}
