import * as React from 'react'
import { Box, Heading, Paragraph, Button } from 'grommet'
import { Data } from './views/Data'
import { dataByIndustry, DataByIndustryContext } from './data/dataByIndustry'

interface Props {
}

interface State {
  industry?: Industry,
  data: IndustryData
}

export class App extends React.PureComponent<Props, State> {
  state = {
    industry: undefined,
    data: dataByIndustry.all
  }

  selectIndustry = (industry: Industry) => () => {
    const data = dataByIndustry[industry] || dataByIndustry.all
    this.setState({ industry, data })
  }

  render () {
    const { industry, data } = this.state

    if (!industry) {
      return (
        <Box margin='xlarge' align='center'>
          <Heading size='large'>Correlação entre faculdades e empresas</Heading>
          <Paragraph size='xlarge' textAlign='center'>
              A partir do LinkedIn, foi possível extrair dados indicando a relação entre universidades e empresas do mercado.
          </Paragraph>
          <Heading size='small' textAlign='center'>Escolha uma indústria abaixo para iniciar a visualização</Heading>
          <Box gap='medium' direction='row'>
            <Button label='Todas' onClick={this.selectIndustry('all')}/>
            <Button label='Tecnologia' onClick={this.selectIndustry('technology')}/>
          </Box>
        </Box>
      )
    }

    return (
      <DataByIndustryContext.Provider value={data}>
        <Data industry={industry} />
      </DataByIndustryContext.Provider>
    )
  }
}
