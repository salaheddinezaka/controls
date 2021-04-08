import React from 'react'
import styled from 'styled-components'
import SearchInput from './search-input'
import { usePSLContext } from '../../controls/student-loan-v2/state/context'
import { SearchTypes } from '../../controls/student-loan-v2/state/search-reducer'
import { ModalBackground } from '../styled'
import { AnimatePresence, motion } from 'framer-motion'

const SearchSchoolsModal = () => {
  const {
    dispatch,
    state: { selectedCollege }
  } = usePSLContext()
  return (
    <AnimatePresence exitBeforeEnter>
      <ModalBackground
        onClick={() => dispatch({ type: SearchTypes.CLOSE_INITIAL_MODAL })}
      />
      <ModalContainer
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 50, x: '-50%' }}
        exit={{ y: '100%', x: '-50%' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="329pt"
          viewBox="0 0 329.26933 329"
          onClick={() => dispatch({ type: SearchTypes.CLOSE_INITIAL_MODAL })}
        >
          <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
        </svg>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Which college will you be attending?</ModalTitle>
            <img
              src="https://cdn.zeplin.io/5fb6b6e30914549574b7eeee/assets/CB1DF7C0-4276-47C2-8E7C-A7BAF5F76F9C.png"
              alt="credit score"
            />
          </ModalHeader>
          <ModalFormContainer>
            <SearchInput />
            <SubmitSearchButton
              onClick={() => {
                if (window.renderAdFeed != undefined) {
                  window.renderAdFeed({ 'data-school': selectedCollege.opeid })
                }
                selectedCollege &&
                  dispatch({ type: SearchTypes.CLOSE_INITIAL_MODAL })
              }}
            >
              FIND LOANS
            </SubmitSearchButton>
          </ModalFormContainer>
        </ModalContent>
      </ModalContainer>
    </AnimatePresence>
  )
}

const ModalContainer = styled(motion.div)`
  position: absolute;
  max-height: calc(100vh - 60px);
  width: 70%;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 60px 0 rgba(112, 115, 114, 0.13);
  padding: 80px 95px;
  box-sizing: border-box;

  svg {
    height: 20px;
    width: 20px;
    cursor: pointer;
    user-select: none;
    position: absolute;
    right: 10px;
    top: 10px;
  }
`
const ModalContent = styled.div`
  margin: 0 auto;
`
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 71px;
  img {
    height: 144px;
  }
`
const ModalTitle = styled.div`
  font-family: Poppins;
  font-size: 48px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: normal;
  color: #3c3b3b;
`
const ModalFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`
const SubmitSearchButton = styled.button`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.23px;
  text-align: center;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 22px 46px;
  background-color: #1a73e8;
  cursor: pointer;
`
export default SearchSchoolsModal