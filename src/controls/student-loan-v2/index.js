import React from 'react'
import ReactDOM from 'react-dom'
import SearchSchools from '../../components/search-schools'
import { waitFor } from '../../utils/helpers'
import { PrivateStudentLoanSearchProvider } from './state/context'

waitFor('#search-schools-control', () => {
  const containerDataSet = document.getElementById('search-schools-control').dataset;
  window.searchButtonText = containerDataSet.searchButtonText || "Find Loans"

  if(containerDataSet.defaultValue !== undefined){
    window.lincxDefaultValue = containerDataSet.defaultValue;
  }

  if(containerDataSet.defaultValue !== undefined && containerDataSet.defaultValue === ""){
    window.lincxDefaultValue = "";
  }

  if(containerDataSet.defaultValue === undefined){
    window.lincxDefaultValue = "default";
  }

  ReactDOM.render(
    <PrivateStudentLoanSearchProvider>
      <SearchSchools />
    </PrivateStudentLoanSearchProvider>,
    document.getElementById('search-schools-control')
  )
})
