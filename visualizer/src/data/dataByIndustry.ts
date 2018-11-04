import React from 'react'
import { getCorrelationTableWeighted, getCorrelationTable } from './correlationTable'
import { getSchoolData } from './schoolData'
import { getCompanyData } from './companyData'

const schoolData = getSchoolData()
const companyData = getCompanyData()
const correlation = getCorrelationTable()
const correlationWeighted = getCorrelationTableWeighted()

const all = {
  correlation,
  correlationWeighted,
  schoolData,
  companyData
}

const technology = {
  correlation,
  correlationWeighted,
  schoolData,
  companyData
}

export const dataByIndustry: DataByIndustry = {
  all,
  technology
}

export const DataByIndustryContext = React.createContext<IndustryData>(dataByIndustry.all)
