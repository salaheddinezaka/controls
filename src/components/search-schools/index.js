import React, { useState } from 'react'
import SearchSchoolsModal from './modal'
import DesktopForm from './desktop-form'
import { usePSLContext } from '../../controls/student-loan-v2/state/context'

const SearchSchools = () => {
  const {
    state: { showModal }
  } = usePSLContext()
  return (
    <>
      {showModal ? <SearchSchoolsModal /> : null}
      <DesktopForm />
    </>
  )
}

export default SearchSchools
