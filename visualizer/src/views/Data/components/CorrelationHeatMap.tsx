import * as React from 'react'
import ReactHighcharts from 'react-highcharts'
import HeatMap from 'highcharts/modules/heatmap'
HeatMap(ReactHighcharts.Highcharts)

const formatterFn = (isPercentage: boolean) => function (this: any) {
  const amountString = isPercentage
   ? `${(this.point.value * 100).toFixed(2)}%`
   : `${this.point.value}`

  return (
  `<b>${amountString}</b> ex-alunos da <b>${this.series.xAxis.categories[this.point.x]}</b> trabalham na <b>${this.series.yAxis.categories[this.point.y]}</b>`
  )
}

const config = (correlation: any, formatter: () => string) => ({
  chart: {
    type: 'heatmap',
    height: 3000,
    width: 1500,
    plotBorderWidth: 1
  },
  title: {
    text: 'Correlação entre empresas e faculdades'
  },
  xAxis: {
    categories: correlation.schools,
    opposite: true
  },
  yAxis: {
    categories: correlation.companies
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
    data: correlation.correlation
  }]
})

interface Props extends DataByIndustry {
}

export class CorrelationHeatMap extends React.PureComponent<Props> {
  render () {
    const { correlation, correlationWeighted, weighted } = this.props
    const formatter = formatterFn(!!weighted)

    const passedConfig = config(weighted ? correlationWeighted : correlation, formatter)

    return (<ReactHighcharts config={passedConfig}/>)
  }
}
