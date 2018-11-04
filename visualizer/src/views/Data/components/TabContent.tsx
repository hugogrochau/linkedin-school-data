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

type TabComponentMap = { [key: string]: ({}: any) => any }
const tabComponentMap: TabComponentMap = {
  correlation: (dataByIndustry) => <CorrelationHeatMap {...dataByIndustry} />,
  correlationWeighted: (dataByIndustry) => <CorrelationHeatMap {...dataByIndustry} weighted={true} />,
  companies: (dataByIndustry) => <CompanyData {...dataByIndustry} />,
  schools: (dataByIndustry) => <SchoolData {...dataByIndustry} />
}

export class TabContent extends React.PureComponent<Props, State> {
  render () {
    const { activeTab } = this.props

    const TabComponent = tabComponentMap[activeTab] || tabComponentMap.correlation

    return (
      <DataByIndustryContext.Consumer>
        {TabComponent}
      </DataByIndustryContext.Consumer>
    )
  }
}
