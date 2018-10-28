import React from 'react'
import correlationTable from './correlationTable.json'
import { getSchoolData } from './schoolData'
import { getCompanyData } from './companyData'

const schoolData = getSchoolData()
const companyData = getCompanyData()

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

export const DataByIndustryContext = React.createContext<IndustryData>(dataByIndustry.all)
