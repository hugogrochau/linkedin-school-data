import * as R from 'ramda'

import { getSchoolDataByName } from '../schoolData/schoolData'
import { getCompanyDataByName } from '../companyData/companyData'
import { getCorrelationTableWeighted } from '../correlationTable/correlationTable'

export const getCorrelationGraph = (): CorrelationGraph => {
  const { schools, companies, correlation } = getCorrelationTableWeighted()
  const schoolDataByName = getSchoolDataByName()
  const companyDataByName = getCompanyDataByName()

  const schoolNodes = generateSchoolNodes(schools, schoolDataByName)
  const schoolIds = schoolNodes.map(sn => sn.id)

  const companyNodes = generateCompanyNodes(companies, companyDataByName)
  const filteredCompanyNodes = companyNodes.filter(cn => !R.contains(cn.id, schoolIds))
  const nodes = [
    ...schoolNodes,
    ...filteredCompanyNodes
  ]

  const edges = generateEdges(correlation, schoolDataByName, companyDataByName, schools, companies)

  return { nodes, edges }
}

const schoolColor = {
  border: '#FFA91B',
  background: '#FFD58F',
  highlight: {
    border: '#FFA91B',
    background: '#FFECCE'
  },
  hover: {
    border: '#FFA91B',
    background: '#FFECCE'
  }
}

const generateSchoolNodes = (schools: string[], schoolData: SchoolDataByName): CorrelationNode[] => {
  const schoolNodes = schools.map(school => {
    const schoolInformation = schoolData[school]
    const { id, alumni } = schoolInformation

    return {
      id,
      label: school,
      value: parseInt(alumni, 10),
      color: schoolColor
    }
  })

  return schoolNodes
}

const generateCompanyNodes = (companies: string[], companyData: CompanyDataByName): CorrelationNode[] => {
  const companyNodes = companies.map(company => {
    const companyInformation = companyData[company]
    const { id, employees } = companyInformation

    return {
      id,
      label: company,
      value: parseInt(employees, 10)
    }
  })

  return companyNodes
}

const generateEdges = (correlation: CorrelationItem[], schoolData: SchoolDataByName, companyData: CompanyDataByName, schoolNames: string[], companyNames: string[]): CorrelationEdge[] => {
  const edges = correlation.map(correlationItem => {
    const [schoolIndex, companyIndex, correlationWeight] = correlationItem
    const school = schoolData[schoolNames[schoolIndex]]
    const company = companyData[companyNames[companyIndex]]

    const title = `${(correlationWeight * 100).toFixed(2)}% ex-alunos da ${school.name} trabalham na ${company.name}`
    return {
      from: school.id,
      to: company.id,
      value: correlationWeight,
      title
    }
  })

  return edges
}
