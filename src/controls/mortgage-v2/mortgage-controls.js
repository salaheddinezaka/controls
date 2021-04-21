import React, { useEffect, useState } from 'react'
import RefineResultsButton from '../../components/refine-results-button'
import useWindowSize from '../../hooks/use-window-size'
import DropDowns from './dropdowns'
import PurchaseWhenModal from './purchase-modal'

export default function MortgageControls() {
  const [width] = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (width > 0 && width <= 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [width])
  return (
    <>
      {isMobile ? (
        <RefineResultsButton onClick={() => console.log('refine Button')} />
      ) : (
        <DropDowns />
      )}
      <PurchaseWhenModal />
    </>
  )
}
