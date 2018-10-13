import * as React from 'react'
import { CorrelationHeatMap } from './CorrelationHeatMap'
import { Text } from 'grommet'

interface Props {
  activeTab: string
}

interface State {
}

export class TabContent extends React.PureComponent<Props, State> {
  render () {
    const { activeTab } = this.props

    if (activeTab === 'correlation') {
      return (<CorrelationHeatMap industry='technology' />)
    }

    if (activeTab === 'companies') {
      return (<Text>companies</Text>)
    }

    if (activeTab === 'schools') {
      return (<Text>companies</Text>)
    }

    throw new Error(`Invalid tab ${activeTab}`)
  }

}
