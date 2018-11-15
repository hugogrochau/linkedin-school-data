import * as React from 'react'
import { CorrelationHeatMap } from './components/CorrelationHeatMap'
import { SchoolData } from './components/SchoolData'
import { CompanyData } from './components/CompanyData'
import { CorrelationGraph } from './components/CorrelationGraph/CorrelationGraph'

import { DataByIndustryContext } from '../../../../data/dataByIndustry'

interface Props {
  activeTab: string
}

interface State {
}

type TabComponentMap = { [key: string]: ({}: any) => any }
const tabComponentMap: TabComponentMap = {
  graph: (dataByIndustry) => <CorrelationGraph {...dataByIndustry} />,
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
