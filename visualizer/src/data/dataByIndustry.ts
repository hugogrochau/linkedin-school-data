import React from 'react'
import correlationTable from './correlationTable.json'
import schoolData from './schoolData.json'
import companyData from './companyData.json'

const all = {
  correlation: correlationTable,
  schoolData,
  companyData
}

const technology = {
  correlation: correlationTable,
  schoolData,
  companyData
}

export const dataByIndustry: DataByIndustry = {
  all,
  technology
}

export const DataByIndustryContext = React.createContext<DataByIndustry>(dataByIndustry[0])
