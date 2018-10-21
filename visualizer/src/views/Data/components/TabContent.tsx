import * as React from 'react'
import { CorrelationHeatMap } from './CorrelationHeatMap'
import { DataByIndustryContext } from '../../../data/dataByIndustry'
import { Text } from 'grommet'

interface Props {
  activeTab: string
}

interface State {
}

type TabComponentMap = { [key: string]: React.ComponentClass<any> }
const tabComponentMap: TabComponentMap = {
  correlation: CorrelationHeatMap,
  companies: CorrelationHeatMap,
  schools: CorrelationHeatMap
}

export class TabContent extends React.PureComponent<Props, State> {
  render () {
    const { activeTab } = this.props

    const TabComponent = tabComponentMap[activeTab] || tabComponentMap.correlation

    return (
      <DataByIndustryContext.Consumer>
        {dataByIndustry => <TabComponent {...dataByIndustry} />}
      </DataByIndustryContext.Consumer>
    )
  }
}
