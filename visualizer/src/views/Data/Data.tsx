import * as React from 'react'
import { Heading, Box, Tabs, Tab, Text } from 'grommet'
import { TabContent } from './components/TabContent'

interface Props {
  industry: 'all' | 'technology' | null
}

interface State {
  activeIndex: number
}

const industryLabels = {
  technology: 'Tecnologia',
  all: 'Todas'
}

export class Data extends React.PureComponent<Props, State> {
  state = {
    activeIndex: 0
  }

  render () {
    const { industry } = this.props
    const { activeIndex } = this.state

    return (
      <Box>
        <Heading>{industryLabels[industry || 'all']}</Heading>
        <Tabs onActive={activeIndex => this.setState({ activeIndex })}>
          <Tab title='Tabela de correlação' />
          <Tab title='Empresas' />
          <Tab title='Faculdades' />
        </Tabs>
        <Text>{activeIndex}</Text>

        <TabContent activeIndex={activeIndex} />
      </Box>
    )
  }
}
