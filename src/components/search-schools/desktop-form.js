import React from 'react'
import styled from 'styled-components'
import { usePSLContext } from '../../controls/student-loan-v2/state/context'
import { below } from '../../utils/media-query'
import { SubmitSearchButton } from '../styled'
import SearchInput from './search-input'

const DesktopForm = () => {
  const {
    state: { selectedCollege }
  } = usePSLContext()
  return (
    <FormContainer>
      <ImageStyled src={window.lincxMainIcon} />
      <SearchTitle>Which college will you be attending?</SearchTitle>
      <SearchInput shouldSubmitOnSelect={!window.lincxDesktopCTA} />
      {window.lincxDesktopCTA && (
        <SubmitSearchButton
          onClick={() => {
            if (window.renderAdFeed != undefined) {
              window.renderAdFeed({ 'data-school': selectedCollege.opeid })
            }
          }}
        >
          {window.searchButtonText}
        </SubmitSearchButton>
      )}
    </FormContainer>
  )
}

const FormContainer = styled.div`
  padding: 33px 25px 32px;
  border-radius: 8px;
  box-shadow: 0 2px 14px 0 rgba(60, 64, 67, 0.3);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  margin-bottom: 16px;
  ${below.small`
    display: none;
  `}
`

const ImageStyled = styled.img`
  height: 58px;
  object-fit: contain;
`
const SearchTitle = styled.div`
  font-family: var(--lincxContentFont);
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.8;
  letter-spacing: normal;
  color: #121212;
  margin: auto 16px;
  ${below.med`
    width: 203px;
    line-height: 1.4;
  `}
`

export default DesktopForm
