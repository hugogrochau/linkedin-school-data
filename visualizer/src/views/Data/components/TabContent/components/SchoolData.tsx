import * as React from 'react'
import { DataTable, Text } from 'grommet'

interface Props extends IndustryData {
}

export class SchoolData extends React.PureComponent<Props> {
  render () {
    const { schoolData } = this.props
    const columns = [
      {
        property: 'name',
        header: 'Nome',
        primary: true
      },
      {
        property: 'location',
        header: 'Localização'
      },
      {
        property: 'followers',
        header: 'Seguidores'
      },
      {
        property: 'employees',
        header: 'Funcionários'
      },
      {
        property: 'alumni',
        header: 'Ex-alunos'
      }
    ]

    return (
      <DataTable
        columns={columns}
        data={schoolData}
        sortable={true}
      />
    )
  }
}
