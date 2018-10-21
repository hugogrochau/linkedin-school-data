declare module '*.json' {
  const value: any
  export default value
}

declare module 'highcharts/modules/heatmap'

declare module 'react-highcharts'

declare interface DataByIndustry {
  [industry: string]: any
}
