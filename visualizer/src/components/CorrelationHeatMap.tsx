import * as React from 'react'
import ReactHighcharts from 'react-highcharts'
import HeatMap from 'highcharts/modules/heatmap'
HeatMap(ReactHighcharts.Highcharts)

const formatter = function (this: any) {
  return (
  `<b>${this.point.value}</b> ex-alunos da <b>${this.series.xAxis.categories[this.point.x]}</b> trabalham na <b>${this.series.yAxis.categories[this.point.y]}</b>`
  )
}

const config = {
  chart: {
    type: 'heatmap',
    plotBorderWidth: 1
  },
  title: {
    text: 'Correlação entre empresas e faculdades'
  },
  xAxis: {
    categories: ['PUC-RIO', 'UFRJ']
  },
  yAxis: {
    categories: ['Petrobras', 'Ambev'],
    title: null
  },
  colorAxis: {
    min: 0,
    minColor: '#FFFFFF',
    maxColor: '#0000FF'
  },
  legend: {
    align: 'right',
    layout: 'vertical',
    margin: 0,
    verticalAlign: 'top',
    y: 25,
    symbolHeight: 280
  },
  tooltip: {
    formatter
  },
  series: [{
    name: 'Correlação entre empresas e faculdades',
    borderWidth: 1,
    data: [[0, 0, 10], [0, 1, 19], [1, 0, 20], [1, 1, 30]]
  }]
}

export class CorrelationHeatMap extends React.PureComponent {
  render () {
    return (
      <ReactHighcharts config={config}/>
    )
  }
}
