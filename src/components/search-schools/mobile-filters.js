import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import styled from 'styled-components'
import { usePSLContext } from '../../controls/student-loan-v2/state/context'
import RefineResultsButton from '../refine-results-button'
import { ModalBackground } from '../styled'
import SearchInput from './search-input'

const MobileFilters = () => {
  const [showMobileModal, setShowMobileModal] = useState(false)
  const {
    state: { selectedCollege }
  } = usePSLContext()
  const handleSearchSubmit = () => {
    if (selectedCollege && window.renderAdFeed != undefined) {
      window.renderAdFeed({ 'data-school': selectedCollege.opeid })
    }
    handleCloseModal()
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const handleCloseModal = () => {
    setShowMobileModal(false)
  }
  return (
    <>
      <RefineResultsButton onClick={() => setShowMobileModal(true)} />
      <AnimatePresence>
        {showMobileModal && (
          <>
            <ModalBackground
              onClick={handleCloseModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
            />
            <ModalContainer
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
            >
              <ModalWhiteBar />
              <ModalHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 477.867 477.867"
                >
                  <path d="M460.8 221.867H185.31c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 238.934 17.07 17.07 0 0 0 17.067 256h36.557c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-341.333 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 51.2h-53.623c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 68.267a17.07 17.07 0 0 0 17.067 17.067H275.49c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067A17.07 17.07 0 0 0 460.8 51.2zm-119.466 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 392.534h-87.757c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 409.6a17.07 17.07 0 0 0 17.067 17.067h224.29c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-153.6 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.281 34.133-34.133 34.133z" />
                </svg>
                <span>Refine Result</span>
              </ModalHeader>
              <ModalBody>
                <SearchInput />
                <SubmitButton onClick={handleSearchSubmit}>
                  Apply Changes
                </SubmitButton>
              </ModalBody>
            </ModalContainer>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
const ModalWhiteBar = styled.div`
  height: 5px;
  width: 40px;
  border-radius: 1.5px;
  background-color: #ffffff;
  margin: 0 auto 10px;
`
const ModalContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  z-index: 9999;
  bottom: 0;
  left: 0;
`
const ModalHeader = styled.div`
  border-radius: 8px 8px 0px 0px;
  background-color: #0e1d31;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  svg {
    height: 20px;
    margin-right: 15px;
  }
  span {
    font-family: Poppins;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
  }
`
const ModalBody = styled.div`
  background-color: #ffffff;
  padding: 30px 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const SubmitButton = styled.button`
  border: none;
  padding: 15px;
  border-radius: 4px;
  background-color: #1a73e8;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.15px;
  text-align: center;
  color: #ffffff;
  width: 100%;
`
export default MobileFilters
