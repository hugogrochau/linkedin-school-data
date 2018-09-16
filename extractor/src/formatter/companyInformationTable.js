export const companyInformationTable = (schoolData) => {
  const companyDataArray = Object.values(schoolData)
  const firstCompany = companyDataArray[0]

  const firstCompanyKeys = Object.keys(firstCompany).filter(key => key !== 'name')
  const headerRow = `Company / Data,${firstCompanyKeys.join(',')}`

  const contentRows = generateRows(companyDataArray)

  return `${headerRow}\n${contentRows}`
}

const generateRows = (companies) => {
  const rows = companies.map(formatCompanyRow)

  return rows.join('\n')
}

const formatCompanyRow = (company) => {
  const { name, ...companyDataToGenerate } = company

  const companyDataValues = Object.values(companyDataToGenerate).map(value => !value ? '' : `"${value}"`)

  return `${company.name},${companyDataValues.join(',')}`
}
