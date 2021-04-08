import React, { useEffect, useState } from 'react'
import SearchSchoolsModal from './modal'
import DesktopForm from './desktop-form'
import { usePSLContext } from '../../controls/student-loan-v2/state/context'
import { SearchTypes } from '../../controls/student-loan-v2/state/search-reducer'
import { handleShowMobileFilters } from '../../controls/student-loan-v2/state/actions'
import useWindowSize from '../../hooks/use-window-size'
import MobileFilters from './mobile-filters'

const SearchSchools = () => {
  const {
    state: { showModal, showMobileFilters },
    dispatch
  } = usePSLContext()
  const [width] = useWindowSize()
  useEffect(() => {
    if (showModal && width > 0 && width <= 768) {
      dispatch({ type: SearchTypes.CLOSE_INITIAL_MODAL })
    }

    if (!showMobileFilters && width > 0 && width <= 768) {
      dispatch(handleShowMobileFilters(true))
    }

    if (showMobileFilters && width > 768) {
      dispatch(handleShowMobileFilters(false))
    }
  }, [width])
  return (
    <>
      {showModal ? <SearchSchoolsModal /> : null}
      {showMobileFilters ? <MobileFilters /> : null}
      <DesktopForm />
    </>
  )
}

export default SearchSchools
