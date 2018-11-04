import * as R from 'ramda'
import correlationTableJson from './correlationTable.json'

import { getSchoolDataByName } from './schoolData'

type CorrelationItem = [number, number, number]
interface CorrelationTable {
  schools: string[],
  companies: string[],
  correlation: CorrelationItem[]
}

export const getCorrelationTable = (): CorrelationTable => {
  const { schools, companies, correlation } = correlationTableJson
  const sortedSchools = R.sort(R.ascend(R.identity), schools) as string[]
  const sortedCompanies = R.sort(R.descend(R.identity), companies) as string[]

  const schoolsChangedIndexes = getChangedIndexes(schools, sortedSchools)
  const companiesChangedIndexes = getChangedIndexes(companies, sortedCompanies)

  const mapCorrelation = ([school, company, correlation]: CorrelationItem) => [
    schoolsChangedIndexes[school],
    companiesChangedIndexes[company],
    correlation
  ]

  const sortedCorrelation = correlation.map(mapCorrelation)

  return {
    schools: sortedSchools,
    companies: sortedCompanies,
    correlation: sortedCorrelation
  }

}

const getChangedIndexes = (oldArray: any[], newArray: any[]): {[oldIndex: number]: number} => {
  const newIndexFormatFn = (value: any, index: number) => ({
    [index]: R.findIndex(R.equals(value))(newArray)
  })

  const newIndexes = oldArray.map(newIndexFormatFn)

  return R.mergeAll(newIndexes)
}

export const getCorrelationTableWeighted = () => {
  const correlationTable = getCorrelationTable()
  const { correlation, schools } = correlationTable

  const weightedCorrelation = correlation.map(weightCorrelation(schools))

  return {
    ...correlationTable,
    correlation: weightedCorrelation
  }

}

const weightCorrelation = (schools: string[]) => ([school, company, occurences]: CorrelationItem) => {
  const schoolDataByName = getSchoolDataByName()
  const schoolName = schools[school]
  const { alumni } = schoolDataByName[schoolName]
  const alumniNumber = parseInt(alumni, 10)

  return [school, company, occurences / alumniNumber]
}
