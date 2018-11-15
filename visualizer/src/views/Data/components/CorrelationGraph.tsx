import * as React from 'react'
import Graph from 'react-graph-vis'

interface Props extends IndustryData {
}

const options = {
  autoResize: true,
  nodes: {
    shape: 'dot',
    scaling: {
      min: 10,
      max: 30
    }
  },
  edges: {
    smooth: {
      forceDirection: 'none'
    },
    color: '#000000',
    arrows: 'middle'
  },
  physics: {
    forceAtlas2Based: {
      gravitationalConstant: -26,
      centralGravity: 0.005,
      springLength: 230,
      springConstant: 0.18
    },
    maxVelocity: 146,
    solver: 'forceAtlas2Based',
    timestep: 0.35,
    stabilization: { iterations: 150 }
  },
  layout: {
    improvedLayout: true,
    hierarchical: false
  }
}

const style = { border: '1px black solid', width: '1500px', height: '1500px' }

export class CorrelationGraph extends React.PureComponent<Props> {
  render () {
    const { correlationGraph } = this.props
    return(
      <Graph graph={correlationGraph} options={options} style={style} />
    )
  }
}
