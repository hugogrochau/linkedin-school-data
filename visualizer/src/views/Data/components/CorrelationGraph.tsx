import * as React from 'react'
import Graph from 'react-graph-vis'

interface Props extends IndustryData {
}

const options = {
  autoResize: true,
  nodes: {
    shape: 'dot'
  },
  edges: {
    smooth: {
      forceDirection: 'none'
    },
    color: '#000000',
    arrows: 'middle'
  },
  physics: {
    enabled: false,
    stabilization: false
  },
  layout: {
    improvedLayout: true,
    hierarchical: false
  }
}

const style = { width: '1500px', height: '1500px' }

export class CorrelationGraph extends React.PureComponent<Props> {
  render () {
    const { correlationGraph } = this.props
    return(
      <Graph graph={correlationGraph} options={options} style={style} />
    )
  }
}
