import * as R from 'ramda'
import schoolDataJson from './schoolData.json'

const schoolDataFormatter = R.pipe(
  R.values,
  R.sortBy(R.prop('name')),
  R.map(R.pick(['id', 'name', 'location', 'followers', 'employees', 'alumni']))
)

export const getSchoolData = (): SchoolData => schoolDataFormatter(schoolDataJson) as SchoolData

export const getSchoolDataByName = (): SchoolDataByName => {
  const schoolData = getSchoolData()
  const schoolsByName = R.pipe(
    R.map((school: School) => ({ [school.name]: school })),
    R.mergeAll
  )(schoolData)

  return schoolsByName as SchoolDataByName
}
