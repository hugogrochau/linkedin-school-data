import React from 'react'
import correlationTable from './correlationTable.json'

const all = {
  correlation: correlationTable
}

const technology = {
  correlation: correlationTable
}

export interface DataByIndustry {
  [industry: string]: any
}

export const dataByIndustry: DataByIndustry = {
  all,
  technology
}

export const DataByIndustryContext = React.createContext<DataByIndustry>(dataByIndustry[0])
