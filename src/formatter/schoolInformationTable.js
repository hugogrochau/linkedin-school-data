export const schoolInformationTable = (schoolData) => {
  const schoolDataArray = Object.values(schoolData)
  const firstSchool = schoolDataArray[0]

  const firstSchoolKeys = Object.keys(firstSchool).filter(key => key !== 'companyIds' && key !== 'name')
  const headerRow = `University / Data,${firstSchoolKeys.join(',')}`

  const contentRows = generateRows(schoolDataArray)

  return `${headerRow}\n${contentRows}`
}

const generateRows = (schools) => {
  const rows = schools.map(formatSchoolRow)

  return rows.join('\n')
}

const formatSchoolRow = (school) => {
  const { companyIds, name, ...schoolDataToGenerate } = school

  const schoolDataValues = Object.values(schoolDataToGenerate).map(value => `"${value}"`)

  return `${school.name},${schoolDataValues.join(',')}`
}
