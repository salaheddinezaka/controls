import React, { useEffect, useState } from 'react'
import SearchSchoolsModal from './modal'
import DesktopForm from './desktop-form'
import { usePSLContext } from '../../controls/student-loan-v2/state/context'
import { SearchTypes } from '../../controls/student-loan-v2/state/search-reducer'
import useWindowSize from '../../hooks/use-window-size'

const SearchSchools = () => {
  const {
    state: { showModal },
    dispatch
  } = usePSLContext()
  const [width, height] = useWindowSize()
  useEffect(() => {
    if (showModal && width > 0 && width <= 768) {
      console.log({ width, height })
      dispatch({ type: SearchTypes.CLOSE_INITIAL_MODAL })
    }
  }, [width])
  return (
    <>
      {showModal ? <SearchSchoolsModal /> : null}
      <DesktopForm />
    </>
  )
}

export default SearchSchools
