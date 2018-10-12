import * as React from 'react'
import { Box, Heading, Button } from 'grommet'
import { CorrelationHeatMap } from './components/CorrelationHeatMap'

interface Props {

}

interface State {
  industry: 'all' | 'technology' | null
}

export class App extends React.PureComponent<Props, State> {
  state = {
    industry: null
  }

  render () {
    const { industry } = this.state

    if (!industry) {
      return (
        <Box align='center'>
          <Heading>Escolha uma indústria</Heading>
          <Box gap='medium' direction='row'>
            <Button label='Todas' onClick={() => { this.setState({ industry: 'all' }) }}/>
            <Button label='Tecnologia' onClick={() => { this.setState({ industry: 'technology' })}}/>
          </Box>
        </Box>
      )
    }

    if (industry === 'technology') {
      return (
        <CorrelationHeatMap industry={industry} />
      )
    }
  }
}
