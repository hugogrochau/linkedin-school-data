import * as React from 'react'
import { CorrelationHeatMap } from './CorrelationHeatMap'
import { Text } from 'grommet'

interface Props {
  activeIndex: number
}

interface State {
}

export class TabContent extends React.PureComponent<Props, State> {
  render () {
    const { activeIndex } = this.props

    if (activeIndex === 0) {
      return (<CorrelationHeatMap industry='technology' />)
    }

    return (<Text>empty</Text>)
  }

}
