import * as R from 'ramda'
import schoolDataJson from './schoolData.json'

const schoolDataFormatter = R.pipe(
  R.values,
  R.map(R.pick(['name', 'location', 'followers', 'employees', 'alumni']))
)

export const getSchoolData = (): SchoolData => schoolDataFormatter(schoolDataJson) as SchoolData
