import React from 'react'
import { getCorrelationTableWeighted, getCorrelationTable } from './correlationTable/correlationTable'
import { getSchoolData } from './schoolData/schoolData'
import { getCompanyData } from './companyData/companyData'
import { getCorrelationGraph } from './correlationGraph/correlationGraph'

const schoolData = getSchoolData()
const companyData = getCompanyData()
const correlation = getCorrelationTable()
const correlationWeighted = getCorrelationTableWeighted()
const correlationGraph = getCorrelationGraph()

const all = {
  correlation,
  correlationWeighted,
  schoolData,
  companyData,
  correlationGraph
}

const technology = {
  correlation,
  correlationWeighted,
  schoolData,
  companyData,
  correlationGraph
}

export const dataByIndustry: DataByIndustry = {
  all,
  technology
}

export const DataByIndustryContext = React.createContext<IndustryData>(dataByIndustry.all)
