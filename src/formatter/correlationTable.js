export const correlationTable = (schoolData, companyData, alumniAtCompanies) => {
  const firstCompanies = Object.values(alumniAtCompanies)[0]
  const companyIds = Object.keys(firstCompanies)
  const companyNames = companyIds.map(companyId => companyData[companyId].name)
  const headerRow = `University,${companyNames.join(',')}`

  const contentRows = generateRows(schoolData, alumniAtCompanies)

  return `${headerRow}\n${contentRows}`
}

const generateRows = (schoolData, alumniAtCompanies) => {
  const entries = Object.entries(alumniAtCompanies)

  const rows = entries.map(([schoolId, numberPerCompany]) => {
    const name = schoolData[schoolId].name
    const numbers = Object.values(numberPerCompany)
    return `${name},${numbers.join(',')}`
  })

  return rows.join('\n')
}
