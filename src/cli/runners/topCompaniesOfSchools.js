import fs from 'fs'
import path from 'path'
import config from '../../../config'

import { topCompaniesOfSchools as run } from '../../extractor/topCompaniesOfSchools'

export const topCompaniesOfSchools = async () => {
  const output = await run(config.schools)

  fs.writeFileSync(path.resolve('output', 'topCompaniesOfSchools.json'), JSON.stringify(output, null, 2))
}
