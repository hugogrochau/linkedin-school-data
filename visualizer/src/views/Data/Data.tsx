import * as React from 'react'
import { Heading, Box, Tabs, Tab, Text } from 'grommet'
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
  2: 'companies',
  3: 'schools'
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
      <Box align='center'>
        <Heading>Indústria: {industryLabels[industry || 'all']}</Heading>
        <Tabs onActive={this.updateActiveTab}>
          <Tab title='Tabela de correlação' />
          <Tab title='Tabela de correlação (com peso)' />
          <Tab title='Empresas' />
          <Tab title='Faculdades' />
        </Tabs>

        <TabContent activeTab={activeTab} />
      </Box>
    )
  }
}
