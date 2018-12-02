import React from 'react'
import { getCorrelationTableWeighted, getCorrelationTable } from './correlationTable/correlationTable'
import { getSchoolData } from './schoolData/schoolData'
import { getCompanyData } from './companyData/companyData'
import { getCorrelationGraph } from './correlationGraph/correlationGraph'

const schoolData = getSchoolData()
const companyData = getCompanyData()

const all = {
  correlation: getCorrelationTable(),
  correlationWeighted: getCorrelationTableWeighted(),
  schoolData,
  companyData,
  correlationGraph: getCorrelationGraph()
}

const technology = {
  correlation: getCorrelationTable(true),
  correlationWeighted: getCorrelationTableWeighted(true),
  schoolData,
  companyData,
  correlationGraph: getCorrelationGraph(true)
}

export const dataByIndustry: DataByIndustry = {
  all,
  technology
}

export const DataByIndustryContext = React.createContext<IndustryData>(dataByIndustry.all)
