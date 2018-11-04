import * as R from 'ramda'
import correlationTableJson from './correlationTable.json'

import { getSchoolDataByName } from './schoolData'

export const getCorrelationTable = () => correlationTableJson

type CorrelationItem = [number, number, number]
export const getCorrelationTableWeighted = () => {
  const { correlation } = correlationTableJson

  const weightedCorrelation = correlation.map(weightCorrelation)

  return {
    ...correlationTableJson,
    correlation: weightedCorrelation
  }

}

const weightCorrelation = ([school, company, occurences]: CorrelationItem) => {
  const schoolDataByName = getSchoolDataByName()
  const { schools } = correlationTableJson
  const schoolName = schools[school]
  const { alumni } = schoolDataByName[schoolName]
  const alumniNumber = parseInt(alumni, 10)

  return [school, company, occurences / alumniNumber]
}
