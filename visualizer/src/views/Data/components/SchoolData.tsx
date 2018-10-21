import * as React from 'react'
import { DataTable, Text } from 'grommet'

interface Props extends DataByIndustry {
}

export class SchoolData extends React.PureComponent<Props> {
  render () {
    const columns = [
      {
        property: 'name',
        header: 'Name',
        primary: true
      },
      {
        property: 'location',
        header: 'Location'
      }
    ]

    const data = [
      {
        name: 'Ghandi', location: 'India'
      },
      {
        name: 'Benjamin', location: 'United States of America'
      },
      {
        name: 'Ned Kelly', location: 'Australia'
      }
    ]

    return (
      <DataTable
        columns={columns}
        data={data}
      />
    )
  }
}
