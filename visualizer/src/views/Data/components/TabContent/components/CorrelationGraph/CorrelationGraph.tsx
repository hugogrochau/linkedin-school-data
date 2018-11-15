import * as React from 'react'
import Graph from 'react-graph-vis'

interface Props extends IndustryData {
}

// window.gravitationalConstant = -26

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
      gravitationalConstant: -100,
      centralGravity: 0.065,
      springLength: 0,
      springConstant: 0
    },
    maxVelocity: 146,
    solver: 'forceAtlas2Based',
    timestep: 0.35,
    stabilization: { iterations: 250 }
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
      <>
        <Graph graph={correlationGraph} options={options} style={style} />
      </>
    )
  }
}
