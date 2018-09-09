import fs from 'fs'
import path from 'path'
import config from '../../../config'

import { schoolData as run } from '../../extractor/schoolData'

export const schoolData = async () => {
  const output = await run(config.schools)

  fs.writeFileSync(path.resolve('output', 'schoolData.json'), JSON.stringify(output, null, 2))
}
