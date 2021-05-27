import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import SearchSchoolsModal from './modal'
import DesktopForm from './desktop-form'
import { usePSLContext } from '../../controls/student-loan-v2/state/context'
import { SearchTypes } from '../../controls/student-loan-v2/state/search-reducer'
import { handleShowMobileFilters } from '../../controls/student-loan-v2/state/actions'
import useWindowSize from '../../hooks/use-window-size'
import MobileFilters from './mobile-filters'

const SearchSchools = () => {
  const {
    state: { showModal, showMobileFilters, shouldShowInitialModal },
    dispatch
  } = usePSLContext()
  const [width] = useWindowSize()
  useEffect(() => {
    // // Closing the modal if the width of the screen goes to mobile size
    // if (showModal && width > 0 && width <= 768) {
    //   dispatch({ type: SearchTypes.CLOSE_INITIAL_MODAL })
    // }

    // // Show the modal if the width is desktop and the modal isn't showing or never closed
    // if (shouldShowInitialModal && !showModal && width > 768) {
    //   dispatch({ type: SearchTypes.START_INITIAL_MODAL })
    // }

    // Show Mobile Filters on the width of mobile size
    if (!showMobileFilters && width > 0 && width <= 768) {
      dispatch(handleShowMobileFilters(true))
    }
    // Close the Mobile Filters if the width of the screen goes to desktop size
    if (showMobileFilters && width > 768) {
      dispatch(handleShowMobileFilters(false))
    }
  }, [width])
  return (
    <>
      {window.lincxShowModal && (
        <AnimatePresence exitBeforeEnter>
          {showModal && <SearchSchoolsModal />}
        </AnimatePresence>
      )}
      {showMobileFilters ? <MobileFilters /> : null}
      <DesktopForm />
    </>
  )
}

export default SearchSchools
