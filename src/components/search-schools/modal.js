import React from 'react'
import styled from 'styled-components'
import SearchInput from './search-input'
import { usePSLContext } from '../../controls/student-loan-v2/state/context'
import { SearchTypes } from '../../controls/student-loan-v2/state/search-reducer'

const SearchSchoolsModal = () => {
  const {
    dispatch,
    state: { selectedCollege }
  } = usePSLContext()
  return (
    <>
      <ModalBackground />
      <ModalContainer>
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
    </>
  )
}

const ModalBackground = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9998;
`
const ModalContainer = styled.div`
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
const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: solid 1px #979797;
  border-radius: 4px;
  flex: 1;
  label {
    font-family: Roboto;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #121212;
    position: absolute;
    top: -10px;
    left: 10px;
    background: #ffffff;
    z-index: 9;
    padding: 0 10px;
  }
  input {
    padding: 20px 20px;
    opacity: 0.8;
    font-family: Roboto;
    font-size: 22px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.09;
    letter-spacing: -0.21px;
    color: rgb(18, 18, 18);
    width: 100%;
    border: none;
    outline: none;
  }
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
`
const SuggestionsList = styled.ul`
  position: absolute;
  top: 102%;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgb(60 64 67 / 30%);
  background-color: #ffffff;
  width: 100%;
  list-style: none;
  padding-inline-start: 0;
  height: 224px;
  overflow-y: scroll;
`
const SuggestionItemStyle = styled.li`
  padding: 12px 0px;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  svg {
    color: transparent;
    position: initial;
    margin: 0 12px;
  }
  .school__name {
    display: block;
    opacity: 0.8;
    font-family: Roboto;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.15px;
    color: #121212;
  }
  .school__adress {
    display: block;
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.15px;
    color: #808080;
  }
  &:hover {
    background-color: #e8f0fe;
    .school__name,
    .school__adress {
      color: #1a73e8;
    }
    svg {
      color: #fbbc06;
    }
  }
`
export default SearchSchoolsModal
