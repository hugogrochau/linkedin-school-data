import * as React from 'react'
import correlationTable from '../../../data/correlationTable.json'
import ReactHighcharts from 'react-highcharts'
import HeatMap from 'highcharts/modules/heatmap'
import { DataByIndustryContext } from '../../../data/dataByIndustry'
HeatMap(ReactHighcharts.Highcharts)

const formatter = function (this: any) {
  return (
  `<b>${this.point.value}</b> ex-alunos da <b>${this.series.xAxis.categories[this.point.x]}</b> trabalham na <b>${this.series.yAxis.categories[this.point.y]}</b>`
  )
}

const config = (correlation: any) => ({
  chart: {
    type: 'heatmap',
    height: 2000,
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

interface Props {
  industry: string | null
}

export class CorrelationHeatMap extends React.PureComponent<Props> {
  render () {
    return (
      <DataByIndustryContext.Consumer>
        {dataByIndustry => <ReactHighcharts config={config(dataByIndustry.correlation)}/>}
      </DataByIndustryContext.Consumer>
    )
  }
}