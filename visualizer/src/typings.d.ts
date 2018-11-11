declare module '*.json' {
  const value: any
  export default value
}

declare module 'highcharts/modules/heatmap'

declare module 'react-highcharts'

declare module 'react-graph-vis'

interface IndustryData {
  correlation: CorrelationTable,
  correlationWeighted: CorrelationTable,
  schoolData: SchoolData,
  companyData: CompanyData,
  correlationGraph: CorrelationGraph
}

type Industry = 'all' | 'technology'

interface DataByIndustry {
  [industry: string]: IndustryData
}

interface School {
  id: number,
  name: string,
  location: string,
  followers: string,
  employees: string,
  alumni: string
}

type SchoolData = School[]

interface SchoolDataByName {
  [name: string]: School
}

interface Company {
  id: number,
  name: string,
  location: string,
  followers: string,
  employees: string,
  industries: string
}

type CompanyData = Company[]

interface CompanyDataByName {
  [name: string]: Company
}

type CorrelationItem = [number, number, number]

interface CorrelationTable {
  schools: string[],
  companies: string[],
  correlation: CorrelationItem[]
}

interface CorrelationNode {
  id: number,
  value: number,
  label: string,
  color?: any
}

interface CorrelationEdge {
  from: number,
  to: number,
  value: number,
  title: string
}

interface CorrelationGraph {
  nodes: CorrelationNode[],
  edges: CorrelationEdge[]
}
