import fs from 'fs'
const buildSchoolUrl = (schoolName) => `https://linkedin.com/school/${schoolName}/`
const schoolIdRegex = /headquarter","school":"urn:li:fs_normalized_school:(\d*)/

export const getSchoolIdByName = async (page, schoolName) => {
  const schoolUrl = buildSchoolUrl(schoolName)
  await page.goto(schoolUrl)

  const content = await page.content()
  fs.writeFileSync('content.html', content)
  const [, schoolId] = content.match(schoolIdRegex)

  return parseInt(schoolId, 10)
}
