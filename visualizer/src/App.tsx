import * as React from 'react'
import { Box, Heading, Paragraph, Button } from 'grommet'
import { Data } from './views/Data'

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
        <Box margin='xlarge' align='center'>
          <Heading size='large'>Correlação entre faculdades e empresas</Heading>
          <Paragraph size='xlarge' textAlign='center'>
              A partir do LinkedIn, foi possível extrair dados indicando a relação entre universidades e empresas do mercado.
          </Paragraph>
          <Heading size='small' textAlign='center'>Escolha uma indústria abaixo para iniciar a visualização</Heading>
          <Box gap='medium' direction='row'>
            <Button label='Todas' onClick={() => { this.setState({ industry: 'all' }) }}/>
            <Button label='Tecnologia' onClick={() => { this.setState({ industry: 'technology' })}}/>
          </Box>
        </Box>
      )
    }

    return (
      <Data industry={industry} />
    )
  }
}
