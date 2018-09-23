export const correlationTable = (schoolData, companyData, alumniAtCompanies) => {
  const schoolIds = Object.keys(alumniAtCompanies)
  const schools = schoolIds.map(schoolId => schoolData[schoolId].name)

  const firstCompanies = Object.values(alumniAtCompanies)[0]
  const companyIds = Object.keys(firstCompanies)
  const companies = companyIds.map(companyId => companyData[companyId].name)

  const correlation = generateCorrelationTable(alumniAtCompanies)

  return {
    companies,
    schools,
    correlation
  }
}

const generateCorrelationTable = (alumniAtCompanies) => {
  const schoolValues = Object.values(alumniAtCompanies)

  const table = []

  for (let i = 0; i < schoolValues.length; i++) {
    const companyValues = Object.values(schoolValues[i])
    for (let j = 0; j < companyValues.length; j++) {
      table.push([i, j, companyValues[j]])
    }
  }

  return table
}
