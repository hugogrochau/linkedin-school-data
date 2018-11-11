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

interface Props extends DataByIndustry {
}

const graph = {
  nodes: [
      { id: 1, value: 2, label: 'Algie' },
      { id: 2, value: 31, label: 'Alston' },
      { id: 3, value: 12, label: 'Barney' },
      { id: 4, value: 16, label: 'Coley' },
      { id: 5, value: 17, label: 'Grant' },
      { id: 6, value: 15, label: 'Langdon' },
      { id: 7, value: 6, label: 'Lee' },
      { id: 8, value: 5, label: 'Merlin' },
      { id: 9, value: 30, label: 'Mick' },
      { id: 10, value: 18, label: 'Tod' }
  ],
  edges: [
    { from: 2, to: 8, value: 3, title: '3 emails per week' },
    { from: 2, to: 9, value: 5, title: '5 emails per week' },
    { from: 2, to: 10, value: 1, title: '1 emails per week' },
    { from: 4, to: 6, value: 8, title: '8 emails per week' },
    { from: 5, to: 7, value: 2, title: '2 emails per week' },
    { from: 4, to: 5, value: 1, title: '1 emails per week' },
    { from: 9, to: 10, value: 2, title: '2 emails per week' },
    { from: 2, to: 3, value: 6, title: '6 emails per week' },
    { from: 3, to: 9, value: 4, title: '4 emails per week' },
    { from: 5, to: 3, value: 1, title: '1 emails per week' },
    { from: 2, to: 7, value: 4, title: '4 emails per week' }
  ]
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
    return (
      <Container>
        <Graph graph={graph} options={options} events={events} style={style} />)
      </Container>
    )
  }
}
