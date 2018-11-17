import * as React from 'react'
import { Heading, Box, Tabs, Tab } from 'grommet'
import { TabContent } from './components/TabContent'

interface Props {
  industry: 'all' | 'technology' | null
}

interface State {
  activeTab: string
}

const industryLabels = {
  technology: 'Tecnologia',
  all: 'Todas'
}

type Tabs = { [key: number]: string }

const tabs: Tabs = {
  0: 'correlation',
  1: 'correlationWeighted',
  2: 'graph',
  3: 'companies',
  4: 'schools'
}

export class Data extends React.PureComponent<Props, State> {
  state = {
    activeTab: tabs[0]
  }

  updateActiveTab = (activeIndex: number) => {
    this.setState({ activeTab: tabs[activeIndex || 0] })
  }

  render () {
    const { industry } = this.props
    const { activeTab } = this.state

    return (
      <Box align='center' gap='large'>
        <Heading>Indústria: {industryLabels[industry || 'all']}</Heading>
        <Tabs onActive={this.updateActiveTab}>
          <Tab title='Tabela de correlação (absoluto)' />
          <Tab title='Tabela de correlação (percentual)' />
          <Tab title='Grafo' />
          <Tab title='Empresas' />
          <Tab title='Faculdades' />
        </Tabs>

        <TabContent activeTab={activeTab} />
      </Box>
    )
  }
}
