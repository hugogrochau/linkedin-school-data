import * as R from 'ramda'
import fs from 'fs'
import path from 'path'
import config from '../../../config'

import { schoolData as run } from '../../extractor/schoolData'

export const schoolData = async () => {
  const schoolData = await run(config.schools)

  const companyIds = R.pipe(
    R.values,
    R.pluck('companyIds'),
    R.flatten,
    R.uniq
  )(schoolData)

  fs.writeFileSync(path.resolve('output', 'schoolData.json'), JSON.stringify(schoolData, null, 2))
  fs.writeFileSync(path.resolve('output', 'companyIds.json'), JSON.stringify(companyIds, null, 2))
}
