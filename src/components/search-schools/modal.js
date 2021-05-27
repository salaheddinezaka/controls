import React from 'react'
import styled from 'styled-components'
import SearchInput from './search-input'
import { usePSLContext } from '../../controls/student-loan-v2/state/context'
import { SearchTypes } from '../../controls/student-loan-v2/state/search-reducer'
import { ModalBackground, SubmitSearchButton } from '../styled'
import { motion } from 'framer-motion'
import { above, below } from '../../utils/media-query'

const SearchSchoolsModal = () => {
  const {
    dispatch,
    state: { selectedCollege }
  } = usePSLContext()
  return (
    <>
      <ModalBackground
        onClick={() => dispatch({ type: SearchTypes.CLOSE_INITIAL_MODAL })}
      />
      <ModalContainer
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 50, x: '-50%' }}
        exit={{ y: '100%', x: '-50%', opacity: 0 }}
        id="lincx-search-modal"
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
              {window.searchButtonText}
            </SubmitSearchButton>
          </ModalFormContainer>
        </ModalContent>
      </ModalContainer>
    </>
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
  ${below.med`
    padding: 40px 20px;
    width: 90%;
  `}
`
const ModalContent = styled.div`
  margin: 0 auto;
`
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column-reverse;
  margin-bottom: 16px;
  img {
    height: 144px;
  }
  ${below.med`
    img {
      height: 96px;
    }
  `}
  ${above.med`
    flex-direction: row;
    margin-bottom: 71px;
  `}
`
const ModalTitle = styled.div`
  font-family: var(--lincxHeaderFont);
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: normal;
  color: #3c3b3b;
  text-align: center;
  ${above.med`
    font-size: 40px;
    text-align: start;
  `}
  ${above.large`
    font-size: 48px;
  `}
`
const ModalFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${above.med`
    flex-direction: row;
  `}
`

export default SearchSchoolsModal
