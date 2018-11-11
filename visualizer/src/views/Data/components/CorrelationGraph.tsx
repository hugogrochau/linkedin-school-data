import * as React from 'react'
import Graph from 'react-graph-vis'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface Props extends IndustryData {
}

const options = {
  nodes: {
    shape: 'dot'
  },
  edges: {
    color: '#000000'
  }
}

const events = {
  select: (event: any) => {
    const { nodes, edges } = event
  }
}

const style = { width: '1500px', height: '3000px' }

export class CorrelationGraph extends React.PureComponent<Props> {
  render () {
    const { correlationGraph } = this.props
    console.log('correlationGraph', correlationGraph)
    return(
      <Container>
        <Graph graph={correlationGraph} options={options} events={events} style={style} />)
      </Container>
    )
  }
}
