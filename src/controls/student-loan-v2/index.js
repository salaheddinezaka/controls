import React from 'react'
import ReactDOM from 'react-dom'
import SearchSchools from '../../components/search-schools'
import { waitFor } from '../../utils/helpers'
import { PrivateStudentLoanSearchProvider } from './state/context'

waitFor('#search-schools-control', () => {
  ReactDOM.render(
    <PrivateStudentLoanSearchProvider>
      <SearchSchools />
    </PrivateStudentLoanSearchProvider>,
    document.getElementById('search-schools-control')
  )
})
