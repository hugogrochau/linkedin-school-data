import * as React from 'react'
import { Text, Table, TableHeader, TableRow, TableBody, TableCell } from 'grommet'

interface Props extends DataByIndustry {
}

export class SchoolData extends React.PureComponent<Props> {
  render () {
    return (
      <Table caption='Simple Table'>
      <TableHeader>
        <TableRow>
          <TableCell scope='col'>
            <Text>Foo</Text>
          </TableCell>
          <TableCell scope='col'>
            <Text>Bar</Text>
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Text>A</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text>B</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    )
  }
}
