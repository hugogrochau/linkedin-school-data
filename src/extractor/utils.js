export const fillOutField = async (page, selector, value) => {
  await page.click(selector)
  await page.keyboard.type(value)
}

export const getText = async (page, selector, regex) => {
  try {
    const result = await page.$eval(selector, el => el.textContent)

    if (!regex) {
      return result
    }

    const matchResults = result.match(regex)
    if (!matchResults) {
      return false
    }

    return matchResults[1]
  } catch (err) {
    return false
  }
}
