import * as R from 'ramda'
import companyDataJson from './companyData.json'

const companyDataFormatter = R.pipe(
  R.values,
  R.pick(['name', 'location', 'followers', 'employees', 'industries'])
)

export const getCompanyData = (): CompanyData => companyDataFormatter(companyDataJson) as CompanyData
