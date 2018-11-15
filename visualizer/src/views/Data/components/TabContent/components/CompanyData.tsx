import * as React from 'react'
import { DataTable, Text } from 'grommet'

interface Props extends IndustryData {
}

export class CompanyData extends React.PureComponent<Props> {
  render () {
    const { companyData } = this.props
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
        property: 'industries',
        header: 'Indústrias'
      }
    ]

    return (
      <DataTable
        columns={columns}
        data={companyData}
      />
    )
  }
}
