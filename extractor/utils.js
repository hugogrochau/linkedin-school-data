export const fillOutField = async (page, selector, value) => {
  await page.click(selector)
  await page.keyboard.type(value)
}
