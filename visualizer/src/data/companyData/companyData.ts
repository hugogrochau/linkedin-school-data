import * as R from 'ramda'
import companyDataJson from './companyData.json'

interface CompanyDataJson {
  [id: string]: {
    id: number,
    name: string,
    location: string,
    followers: string,
    employees: string,
    industries: string
    [key: string]: any
  }
}

const companyDataFormatter = (companyData: CompanyDataJson): CompanyData => {
  const entries = R.toPairs(companyData)
  const companies = entries.map(([id, values]) => ({ id: parseInt(id, 10), ...values }))
  const sortedCompanies = R.sortBy(c => c.name, companies)
  const filteredCompanies = sortedCompanies.map(R.pick(['id', 'name', 'location', 'followers', 'employees', 'industries']))

  return filteredCompanies as CompanyData
}

export const getCompanyData = (): CompanyData => companyDataFormatter(companyDataJson)

export const getCompanyDataByName = (): CompanyDataByName => {
  const companyData = getCompanyData()
  const companiesByName = R.pipe(
    R.map((company: Company) => ({ [company.name]: company })),
    R.mergeAll
  )(companyData)

  return companiesByName as CompanyDataByName
}
