import * as React from 'react'
import { CorrelationHeatMap } from './CorrelationHeatMap'
import { SchoolData } from './SchoolData'
import { CompanyData } from './CompanyData'

import { DataByIndustryContext } from '../../../data/dataByIndustry'

interface Props {
  activeTab: string
}

interface State {
}

type TabComponentMap = { [key: string]: React.ComponentClass<any> }
const tabComponentMap: TabComponentMap = {
  correlation: CorrelationHeatMap,
  companies: CompanyData,
  schools: SchoolData
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
