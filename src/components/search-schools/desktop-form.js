import React from 'react'
import styled from 'styled-components'
import SearchInput from './search-input'

const DesktopForm = () => {
  return (
    <FormContainer>
      <ImageStyled src="https://cdn.zeplin.io/5fb6b6e30914549574b7eeee/assets/9591DAD2-597C-46C4-8824-745D5F1E7B82.png" />
      <SearchTitle>Which college will you be attending?</SearchTitle>
      <SearchInput />
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
  gap: 16px;
  z-index: 9999;
  margin-bottom: 16px;
`

const ImageStyled = styled.img`
  height: 58px;
  object-fit: contain;
`
const SearchTitle = styled.div`
  font-family: Poppins;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.8;
  letter-spacing: normal;
  color: #121212;
`

export default DesktopForm
