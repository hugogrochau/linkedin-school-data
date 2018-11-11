declare module '*.json' {
  const value: any
  export default value
}

declare module 'highcharts/modules/heatmap'

declare module 'react-highcharts'

declare module 'react-graph-vis'

interface IndustryData {
  correlation: any,
  schoolData: SchoolData,
  companyData: CompanyData
}

type Industry = 'all' | 'technology'

interface DataByIndustry {
  [industry: string]: IndustryData
}

interface School {
  name: string,
  location: string,
  followers: string,
  employees: string,
  alumni: string
}

type SchoolData = School[]

interface Company {
  name: string,
  location: string,
  followers: string,
  employees: string,
  industries: string
}

type CompanyData = Company[]
